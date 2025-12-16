from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import os
import sys
from app.routers import students

# Try to import config, fallback to defaults if not available
try:
    # Add parent directory to path to import config
    sys.path.insert(0, str(Path(__file__).parent.parent))
    from config import ALLOWED_ORIGINS, APP_TITLE, APP_VERSION
except ImportError:
    # Fallback defaults if config.py doesn't exist
    ALLOWED_ORIGINS = ["*"]  # Allow all origins for same-domain deployment
    APP_TITLE = "College Student Management API"
    APP_VERSION = "1.0.0"

app = FastAPI(
    title=APP_TITLE,
    description="API for managing college students",
    version=APP_VERSION
)

@app.on_event("startup")
def setup_app():
    """
    Configure CORS, static file serving, and initialize database.
    """
    # Initialize database
    from app.init_db import init_db
    init_db()
    
    # Get allowed origins from config file or environment variable
    # For GoDaddy: same domain deployment, so CORS allows all or specific domains
    allowed_origins = ALLOWED_ORIGINS
    
    # Also check environment variable as override (if somehow available)
    allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
    if allowed_origins_env:
        allowed_origins = allowed_origins_env.split(",")
    
    # Configure CORS
    # On GoDaddy, frontend and backend are same domain, so this is mainly for flexibility
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins if "*" not in allowed_origins else ["*"],
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

