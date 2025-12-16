#!/bin/bash
# Shell script version for GoDaddy deployment
# This can be used if Python script doesn't work with venv

# Virtual environment and application paths
VENV_PATH="/home/g17po2g810k9/virtualenv/public_html/sbbs-tech-admin/backend/3.10"
APP_ROOT="/home/g17po2g810k9/public_html/sbbs-tech-admin/backend"

echo "============================================================"
echo "🚀 Starting application setup with virtual environment..."
echo "============================================================"
echo ""

# Change to application root
cd "$APP_ROOT" || {
    echo "❌ Error: Cannot change to $APP_ROOT"
    exit 1
}

echo "📁 Working directory: $(pwd)"
echo ""

# Activate virtual environment
if [ -f "$VENV_PATH/bin/activate" ]; then
    echo "🔧 Activating virtual environment..."
    source "$VENV_PATH/bin/activate"
    echo "✅ Virtual environment activated"
    echo "   Python: $(which python)"
    echo "   Pip: $(which pip)"
    echo ""
else
    echo "⚠️  Warning: Virtual environment not found at $VENV_PATH"
    echo "   Using system Python"
    echo ""
fi

# Install dependencies
echo "============================================================"
echo "📦 Installing Python dependencies..."
echo "============================================================"
echo ""

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Dependencies installed successfully!"
    else
        echo ""
        echo "❌ Error installing dependencies"
        exit 1
    fi
else
    echo "❌ Error: requirements.txt not found"
    exit 1
fi

echo ""

# Initialize database
echo "============================================================"
echo "🗄️  Initializing database..."
echo "============================================================"
echo ""

python -c "from app.init_db import init_db; init_db()"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database initialized successfully!"
else
    echo ""
    echo "❌ Error initializing database"
    exit 1
fi

echo ""
echo "============================================================"
echo "✅ Setup completed successfully!"
echo "🎉 Your application is ready to use!"
echo "============================================================"

