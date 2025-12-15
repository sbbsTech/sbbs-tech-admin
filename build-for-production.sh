#!/bin/bash
# Simple Build Script for Production

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  🚀 Building Your Website for Production"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Get backend URL from user
echo "📝 Step 1: Enter your Railway backend URL"
echo "   (You got this from Railway in Step 1.4)"
echo "   Example: https://student-app.railway.app"
echo ""
read -p "   Your Railway URL: " BACKEND_URL

# Remove trailing slash if present
BACKEND_URL=${BACKEND_URL%/}

# Validate URL
if [[ ! $BACKEND_URL =~ ^https:// ]]; then
    echo ""
    echo "⚠️  Warning: URL should start with https://"
    echo "   Continuing anyway..."
    echo ""
fi

# Create production env file
echo ""
echo "📝 Step 2: Creating configuration file..."
echo "VITE_API_BASE_URL=${BACKEND_URL}/api" > frontend/.env.production
echo "   ✅ Created .env.production"
echo "   API URL: ${BACKEND_URL}/api"
echo ""

# Navigate to frontend and build
echo "📝 Step 3: Installing dependencies..."
cd frontend
npm install

echo ""
echo "📝 Step 4: Building your website..."
echo "   This may take 1-2 minutes..."
npm run build

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Build Complete!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📦 Your website files are ready!"
echo ""
echo "📍 File Location:"
echo "   backend/app/static/"
echo ""
echo "📋 Next Steps:"
echo "   1. Login to GoDaddy → cPanel → File Manager"
echo "   2. Open the 'public_html' folder"
echo "   3. Upload ALL files from: backend/app/static/"
echo "   4. Visit your domain to see your website!"
echo ""
echo "💡 Tip: Make sure to upload both index.html AND the assets folder"
echo ""

