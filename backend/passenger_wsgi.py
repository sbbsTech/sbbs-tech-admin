"""
Passenger WSGI entry point for GoDaddy Python hosting.
This file is required by GoDaddy's Passenger to run your FastAPI app.
"""
import sys
import os

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the FastAPI app
from app.main import app

# Convert FastAPI (ASGI) to WSGI for Passenger
try:
    from mangum import Mangum
    # Wrap FastAPI app with Mangum to make it WSGI-compatible
    application = Mangum(app)
except ImportError:
    # Fallback: try asgiref if mangum is not available
    try:
        from asgiref.wsgi import WsgiToAsgi
        application = WsgiToAsgi(app)
    except ImportError:
        # If neither is available, raise an error
        raise ImportError(
            "Please install 'mangum' or 'asgiref' package. "
            "Run: pip install mangum"
        )

