@echo off
echo ===================================
echo  Fixing Music Player and Images
echo ===================================
echo.

echo Adding changes to git...
git add .

echo.
echo Committing changes...
git commit -m "Fix music player and image handling for GitHub Pages"

echo.
echo Pushing changes to GitHub...
git push origin main

echo.
echo ===================================
echo  All changes have been pushed!
echo ===================================
echo.
pause 