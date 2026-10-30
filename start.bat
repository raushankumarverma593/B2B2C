@echo off
title Bottle Return Server
echo ====================================================
echo   Bottle Return - Website & Admin Panel
echo   Launching server at http://localhost:5000 ...
echo ====================================================
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo.

:: Open the browser after 2 seconds
start "" http://localhost:5000

:: Start the node server
npm start
pause
