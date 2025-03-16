@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix gallery navigation: Move arrows further outside image frame and reposition close button"
git push
echo Done!
pause 