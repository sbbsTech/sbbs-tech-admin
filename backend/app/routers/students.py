from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import json
from datetime import datetime

from app.database import get_db
from app.models import Student
from app.schemas import StudentCreate, StudentUpdate, StudentResponse, Document

router = APIRouter()

def convert_date_string(date_str):
    """Convert date string to date object or None"""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    except:
        return None

def student_to_dict(student: Student) -> dict:
    """Convert Student model to dictionary with camelCase keys"""
    return {
        "id": student.id,
        "firstName": student.first_name,
        "lastName": student.last_name,
        "email": student.email,
        "enrollmentYear": student.enrollment_year,
        "dob": student.dob.isoformat() if student.dob else None,
        "major": student.major,
        "class": student.class_name,
        "year": student.year,
        "photo": student.photo,
        "documents": json.loads(student.documents) if student.documents else None
    }

@router.post("/", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    """
    Create a new student record
    """
    print("=" * 80)
    print("🔵 BACKEND ENDPOINT HIT: POST /api/students/")
    print("📥 Request Payload:")
    print(f"   Full payload: {student.model_dump()}")
    print("=" * 80)
    
    # Check if email already exists
    existing_student = db.query(Student).filter(Student.email == student.email).first()
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Convert documents list to JSON string if provided
    documents_json = None
    if student.documents:
        documents_json = json.dumps([doc.model_dump() for doc in student.documents])
    
    # Convert date string to date object
    dob_date = convert_date_string(student.dob)
    
    # Create new student
    db_student = Student(
        first_name=student.firstName,
        last_name=student.lastName,
        email=student.email,
        enrollment_year=student.enrollmentYear,
        dob=dob_date,
        major=student.major,
        class_name=student.class_,  # Using class_ from schema
        year=student.year,
        photo=student.photo,
        documents=documents_json
    )
    
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    
    response_data = student_to_dict(db_student)
    print("📤 Response Payload:")
    print(f"   {json.dumps(response_data, indent=2, default=str)}")
    print("=" * 80)
    
    return response_data

@router.get("/", response_model=List[StudentResponse])
def get_students(
    skip: int = 0,
    limit: int = 100,
    year: str = None,
    class_name: str = None,
    db: Session = Depends(get_db)
):
    """
    Get all students with optional filtering by year and class
    """
    print("=" * 80)
    print("🔵 BACKEND ENDPOINT HIT: GET /api/students/")
    print("📥 Query Parameters:")
    print(f"   - skip: {skip}")
    print(f"   - limit: {limit}")
    print(f"   - year: {year}")
    print(f"   - class_name: {class_name}")
    print("=" * 80)
    
    query = db.query(Student)
    
    # Apply filters
    if year:
        query = query.filter(Student.year == year)
    if class_name:
        query = query.filter(Student.class_name == class_name)
    
    students = query.offset(skip).limit(limit).all()
    
    # Convert to response format
    response_data = [student_to_dict(student) for student in students]
    print("📤 Response Payload:")
    print(f"   Found {len(response_data)} student(s)")
    print(f"   {json.dumps(response_data, indent=2, default=str)}")
    print("=" * 80)
    
    return response_data

@router.get("/{student_id}", response_model=StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    """
    Get a specific student by ID
    """
    print("=" * 80)
    print(f"🔵 BACKEND ENDPOINT HIT: GET /api/students/{student_id}")
    print(f"📥 Path Parameter: student_id = {student_id}")
    print("=" * 80)
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        print("❌ Student not found")
        print("=" * 80)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    response_data = student_to_dict(student)
    print("📤 Response Payload:")
    print(f"   {json.dumps(response_data, indent=2, default=str)}")
    print("=" * 80)
    
    return response_data

@router.put("/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    student_update: StudentUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a student record
    """
    print("=" * 80)
    print(f"🔵 BACKEND ENDPOINT HIT: PUT /api/students/{student_id}")
    print(f"📥 Path Parameter: student_id = {student_id}")
    print("📥 Request Payload:")
    update_dict = student_update.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        if key == "documents" and value:
            print(f"   - {key}: {len(value)} document(s)")
        elif key == "photo" and value:
            print(f"   - {key}: Present (base64)")
        else:
            print(f"   - {key}: {value}")
    print(f"   Full payload: {json.dumps(update_dict, indent=2, default=str)}")
    print("=" * 80)
    
    db_student = db.query(Student).filter(Student.id == student_id).first()
    if not db_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    # Check if email is being updated and if it already exists
    if student_update.email and student_update.email != db_student.email:
        existing_student = db.query(Student).filter(Student.email == student_update.email).first()
        if existing_student:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    # Update fields
    update_data = student_update.model_dump(exclude_unset=True)
    
    # Map camelCase to snake_case for database
    if "firstName" in update_data:
        db_student.first_name = update_data["firstName"]
    if "lastName" in update_data:
        db_student.last_name = update_data["lastName"]
    if "email" in update_data:
        db_student.email = update_data["email"]
    if "enrollmentYear" in update_data:
        db_student.enrollment_year = update_data["enrollmentYear"]
    if "dob" in update_data:
        db_student.dob = convert_date_string(update_data["dob"])
    if "major" in update_data:
        db_student.major = update_data["major"]
    if "class" in update_data or "class_" in update_data:
        class_value = update_data.get("class") or update_data.get("class_")
        db_student.class_name = class_value
    if "year" in update_data:
        db_student.year = update_data["year"]
    if "photo" in update_data:
        db_student.photo = update_data["photo"]
    if "documents" in update_data:
        if update_data["documents"] is not None:
            db_student.documents = json.dumps([doc.model_dump() if hasattr(doc, 'model_dump') else doc for doc in update_data["documents"]])
        else:
            db_student.documents = None
    
    db.commit()
    db.refresh(db_student)
    
    response_data = student_to_dict(db_student)
    print("📤 Response Payload:")
    print(f"   {json.dumps(response_data, indent=2, default=str)}")
    print("=" * 80)
    
    return response_data

@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    """
    Delete a student record
    """
    print("=" * 80)
    print(f"🔵 BACKEND ENDPOINT HIT: DELETE /api/students/{student_id}")
    print(f"📥 Path Parameter: student_id = {student_id}")
    print("=" * 80)
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        print("❌ Student not found")
        print("=" * 80)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    print(f"📤 Deleting student: {student.first_name} {student.last_name} (ID: {student.id})")
    db.delete(student)
    db.commit()
    print("✅ Student deleted successfully")
    print("=" * 80)
    return None
