#!/usr/bin/env python3
"""
Setup script for GoDaddy Python App deployment
This script can be run through cPanel's "Executable Python Script" option
"""

import subprocess
import sys
import os
from pathlib import Path

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
        # Install requirements
        result = subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", str(requirements_file)],
            capture_output=True,
            text=True,
            check=False
        )
        
        if result.returncode == 0:
            print("✅ Dependencies installed successfully!")
            print(result.stdout)
            return True
        else:
            print("⚠️  Some packages may have failed to install:")
            print(result.stderr)
            return False
            
    except Exception as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def initialize_database():
    """Initialize the SQLite database"""
    print("=" * 80)
    print("🗄️  Initializing database...")
    print("=" * 80)
    
    try:
        # Import and run database initialization
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
    
    # Change to script directory
    os.chdir(Path(__file__).parent)
    print(f"📁 Working directory: {os.getcwd()}")
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

