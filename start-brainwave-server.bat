@echo off
echo ========================================
echo    BrainWave Server Startup
echo ========================================
echo.

cd /d "C:\Users\PC\Documents\Brainwave  trae"

echo Starting BrainWave Server...
echo.
echo Your server will be available at:
echo   Desktop: http://localhost:8000/
echo   Mobile:  http://105.113.62.32:8000/
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server.js

pause

