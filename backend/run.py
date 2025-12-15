import uvicorn
from app.main import app

if __name__ == "__main__":
    # Initialize database on startup
    from app.init_db import init_db
    init_db()
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

