@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix gallery navigation and music player: Move arrows outside image frame, improve disc dragging"
git push
echo Done!
pause 