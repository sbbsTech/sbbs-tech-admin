#!/usr/bin/env python3
"""
Setup script for GoDaddy Python App deployment
This script can be run through cPanel's "Executable Python Script" option
"""

import subprocess
import sys
import os
from pathlib import Path

# Virtual environment configuration
# UPDATE THESE PATHS if your venv path is different
VENV_BASE = "/home/g17po2g810k9/virtualenv/public_html/sbbs-tech-admin/backend/3.10"
VENV_PYTHON = f"{VENV_BASE}/bin/python"
VENV_PIP = f"{VENV_BASE}/bin/pip"
APP_ROOT = "/home/g17po2g810k9/public_html/sbbs-tech-admin/backend"

def get_python_executable():
    """Get the correct Python executable (virtualenv if available, else system)"""
    if os.path.exists(VENV_PYTHON):
        print(f"✅ Using virtual environment Python: {VENV_PYTHON}")
        return VENV_PYTHON
    else:
        print(f"⚠️  Virtual environment not found at {VENV_PYTHON}")
        print(f"   Using system Python: {sys.executable}")
        return sys.executable

def get_pip_executable():
    """Get the correct pip executable (virtualenv if available, else system)"""
    if os.path.exists(VENV_PIP):
        return VENV_PIP
    else:
        # Fallback to python -m pip
        python_exe = get_python_executable()
        return [python_exe, "-m", "pip"]

def install_requirements():
    """Install Python dependencies from requirements.txt"""
    print("=" * 80)
    print("📦 Installing Python dependencies...")
    print("=" * 80)
    
    requirements_file = Path(__file__).parent / "requirements.txt"
    
    if not requirements_file.exists():
        print(f"❌ Error: requirements.txt not found at {requirements_file}")
        return False
    
    try:
        # Get the correct pip executable
        pip_cmd = get_pip_executable()
        if isinstance(pip_cmd, str):
            # Direct pip executable
            install_cmd = [pip_cmd, "install", "-r", str(requirements_file)]
        else:
            # python -m pip format
            install_cmd = pip_cmd + ["install", "-r", str(requirements_file)]
        
        print(f"🔧 Running: {' '.join(install_cmd)}")
        print()
        
        # Install requirements
        result = subprocess.run(
            install_cmd,
            capture_output=True,
            text=True,
            check=False
        )
        
        if result.returncode == 0:
            print("✅ Dependencies installed successfully!")
            if result.stdout:
                print(result.stdout)
            return True
        else:
            print("⚠️  Some packages may have failed to install:")
            if result.stderr:
                print(result.stderr)
            if result.stdout:
                print(result.stdout)
            return False
            
    except Exception as e:
        print(f"❌ Error installing dependencies: {e}")
        import traceback
        traceback.print_exc()
        return False

def initialize_database():
    """Initialize the SQLite database"""
    print("=" * 80)
    print("🗄️  Initializing database...")
    print("=" * 80)
    
    try:
        # Use virtual environment Python if available
        python_exe = get_python_executable()
        
        # Import and run database initialization using the correct Python
        if python_exe != sys.executable:
            # If using venv Python, run as subprocess to ensure correct environment
            result = subprocess.run(
                [python_exe, "-c", "from app.init_db import init_db; init_db()"],
                cwd=os.getcwd(),
                capture_output=True,
                text=True,
                check=False
            )
            
            if result.returncode == 0:
                print("✅ Database initialized successfully!")
                if result.stdout:
                    print(result.stdout)
                return True
            else:
                print(f"❌ Error initializing database:")
                if result.stderr:
                    print(result.stderr)
                if result.stdout:
                    print(result.stdout)
                return False
        else:
            # Use current Python interpreter
            sys.path.insert(0, str(Path(__file__).parent))
            from app.init_db import init_db
            
            init_db()
            print("✅ Database initialized successfully!")
            return True
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main setup function"""
    print("=" * 80)
    print("🚀 Starting application setup...")
    print("=" * 80)
    print()
    
    # Change to Application Root directory
    # Use absolute path to ensure we're in the right place
    if os.path.exists(APP_ROOT):
        os.chdir(APP_ROOT)
        print(f"📁 Changed to Application Root: {APP_ROOT}")
    else:
        # Fallback to script directory
        app_root = Path(__file__).parent
        os.chdir(app_root)
        print(f"📁 Using script directory: {os.getcwd()}")
        print(f"⚠️  Note: Expected APP_ROOT at {APP_ROOT} but not found")
    print()
    
    # Check virtual environment
    print("🔍 Checking virtual environment...")
    python_exe = get_python_executable()
    print(f"   Python: {python_exe}")
    
    # Verify we're using venv Python
    if python_exe == VENV_PYTHON:
        print("   ✅ Using virtual environment Python")
    else:
        print(f"   ⚠️  Using system Python (venv not found at {VENV_PYTHON})")
    print()
    
    # Step 1: Install dependencies
    deps_ok = install_requirements()
    print()
    
    # Step 2: Initialize database
    db_ok = initialize_database()
    print()
    
    # Summary
    print("=" * 80)
    print("📋 Setup Summary:")
    print("=" * 80)
    print(f"  Dependencies: {'✅ Installed' if deps_ok else '❌ Failed'}")
    print(f"  Database: {'✅ Initialized' if db_ok else '❌ Failed'}")
    print()
    
    if deps_ok and db_ok:
        print("✅ Setup completed successfully!")
        print("🎉 Your application is ready to use!")
        return 0
    else:
        print("⚠️  Setup completed with some errors. Please check the output above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())

