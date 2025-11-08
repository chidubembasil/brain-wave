@echo off
echo ========================================
echo  BrainWave Admin Dashboard Server
echo ========================================
echo.
echo Starting local development server...
echo.
echo Server will be available at:
echo   http://localhost:8000
echo.
echo Pages available:
echo   - Admin Dashboard: http://localhost:8000/admin-dashboard.html
echo   - Test Page: http://localhost:8000/test-assessment-buttons.html
echo   - Index: http://localhost:8000/index.html
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npx http-server -p 8000 -o admin-dashboard.html
