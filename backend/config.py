"""
Configuration file for GoDaddy deployment
Since GoDaddy doesn't support environment variables easily,
we use a config file instead.
"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

# Database configuration
DATABASE_URL = f"sqlite:///{BASE_DIR / 'students.db'}"

# CORS configuration
# Add your domain(s) here - comma separated
# For same-domain deployment, you can leave this empty or use '*'
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://sbbsmgc.in/sbbs-tech-admin/backend",
    "http://admin.sbbsmgc.in"
    
    # Add your production domain(s) here:
    # "https://yourdomain.com",
    # "https://www.yourdomain.com",
]

# If you want to allow all origins (for development/testing)
# Uncomment the line below:
# ALLOWED_ORIGINS = ["*"]

# Application settings
APP_TITLE = "College Student Management API"
APP_VERSION = "1.0.0"

