@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix gallery navigation and music player: Remove dark backgrounds from arrows and close button, fix music player to stop old discs from spinning"
git push
echo Done!
pause 