@echo off
echo Setting up Node.js environment...

REM Add Node.js to PATH
set PATH=%PATH%;"C:\Program Files\nodejs"

echo Node.js PATH added
echo.

cd frontend

echo Starting React development server...
echo Frontend will be available at: http://localhost:3000
echo API should be running at: http://localhost:5000
echo.

npm start