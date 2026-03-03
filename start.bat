@echo off
title Text to Handwriting — Local Server
echo.
echo  ==========================================
echo   Text to Handwriting ^| Local Server
echo  ==========================================
echo.
echo  Starting server at http://localhost:8000
echo  Press Ctrl+C to stop the server.
echo.

:: Open the browser after a short delay (non-blocking)
start /b cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8000"

:: Start the Python HTTP server in the current directory
python -m http.server 8000
