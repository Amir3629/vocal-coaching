@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: Improve disc dragging and ensure music only plays when clicking the center play button"
git push
echo Done!
pause 