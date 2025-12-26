@echo off
echo 🚀 House Price Prediction - Deployment Setup
echo.

echo Step 1: Building React frontend...
cd frontend
call npm install
call npm run build
cd ..
echo ✅ Frontend built successfully
echo.

echo Step 2: Checking for Git repository...
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: House Price Prediction App"
    echo ✅ Git repository initialized
) else (
    echo Git repository already exists
)
echo.

echo Step 3: Ready for deployment!
echo.
echo 📋 NEXT STEPS:
echo 1. Create a GitHub repository
echo 2. Push your code: git remote add origin YOUR_REPO_URL
echo 3. Push to GitHub: git push -u origin main
echo 4. Deploy to one of these free platforms:
echo    • Render.com (recommended)
echo    • Railway.app (easiest)
echo    • Vercel (modern)
echo.

echo 📁 Your project structure:
echo ├── app.py (Flask API)
echo ├── frontend/build/ (React app - ready for deployment)
echo ├── requirements.txt (Python dependencies)
echo ├── house_price_model.pkl (ML model)
echo └── render.yaml, vercel.json (deployment configs)
echo.

echo 🎉 Ready to deploy! Choose your platform above.