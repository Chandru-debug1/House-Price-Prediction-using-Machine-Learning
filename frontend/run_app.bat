@echo off
echo Starting House Price Prediction Application...
echo.

echo Checking if model exists...
if not exist "house_price_model.pkl" (
    echo Model not found. Training model first...
    python train.py
    echo.
)

echo Starting Flask API backend...
start "Flask API" cmd /k "python app.py"

timeout /t 3 /nobreak > nul

echo Starting React frontend...
cd frontend
start "React Frontend" cmd /k "npm start"

cd ..

echo.
echo Application started!
echo - Frontend: http://localhost:3000
echo - API: http://localhost:5000
echo - API Health: http://localhost:5000/health
echo.
echo Press any key to stop all services...
pause > nul

echo Stopping services...
taskkill /FI "WINDOWTITLE eq Flask API*" /T /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq React Frontend*" /T /F > nul 2>&1
echo Services stopped.