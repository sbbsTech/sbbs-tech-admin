from sqlalchemy import Column, Integer, String, Date, Text
from app.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False, index=True)
    last_name = Column(String(100), nullable=False, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    enrollment_year = Column(Integer, nullable=False)
    dob = Column(Date, nullable=True)
    major = Column(String(100), nullable=True)
    class_name = Column(String(10), nullable=False)  # Using class_name to avoid Python keyword conflict
    year = Column(String(50), nullable=False)
    photo = Column(Text, nullable=True)  # Base64 encoded image
    documents = Column(Text, nullable=True)  # JSON string of documents array

