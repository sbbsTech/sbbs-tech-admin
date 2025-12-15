from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import os
from app.routers import students

app = FastAPI(
    title="College Student Management API",
    description="API for managing college students",
    version="1.0.0"
)

@app.on_event("startup")
def setup_app():
    """
    Configure CORS, static file serving, and initialize database.
    """
    # Initialize database
    from app.init_db import init_db
    init_db()
    
    # Get allowed origins from environment variable or use defaults
    allowed_origins = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    
    # Configure CORS - allows frontend from different domains
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Path where Vite builds the frontend (configured in vite.config.ts)
    static_dir = Path(__file__).parent / "static"
    if static_dir.exists():
        # Mount the built frontend assets at the root.
        app.mount(
            "/",
            StaticFiles(directory=str(static_dir), html=True),
            name="static",
        )


@app.get("/health")
def health_check():
    print("=" * 80)
    print("🔵 BACKEND ENDPOINT HIT: GET /health")
    print("📥 No payload")
    print("📤 Response: Health check")
    print("=" * 80)
    return {"status": "healthy"}


# Include API routers under /api so they don't conflict with the SPA routes.
app.include_router(students.router, prefix="/api/students", tags=["students"])

