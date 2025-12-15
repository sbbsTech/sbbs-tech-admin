# Student Management Backend API

FastAPI backend for College Student Management System.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```bash
python app/init_db.py
```

4. Run the server:
```bash
python run.py
```

Or using uvicorn directly:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Students

- `POST /api/students/` - Create a new student
- `GET /api/students/` - Get all students (with optional filters: year, class_name)
- `GET /api/students/{student_id}` - Get a specific student
- `PUT /api/students/{student_id}` - Update a student
- `DELETE /api/students/{student_id}` - Delete a student

## Database

The application uses SQLite database (`students.db`) which will be created automatically in the backend directory.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── init_db.py       # Database initialization
│   └── routers/
│       ├── __init__.py
│       └── students.py  # Student API routes
├── requirements.txt
├── run.py              # Server entry point
└── README.md
```

