#!/bin/bash
# Startup script for production deployment

# Initialize database
python -c "from app.init_db import init_db; init_db()"

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}

