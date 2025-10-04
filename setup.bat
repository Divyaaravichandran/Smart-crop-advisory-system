@echo off
echo Setting up Smart Crop Advisory System...
echo.

echo Installing dependencies...
call npm install

echo.
echo Starting the application...
echo Backend will run on port 3001
echo Frontend will run on port 3000
echo.

call npm run dev:full

pause
