@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: improve image quality, show all discs when dragging, fix spinning animation"
git push
echo Done!
pause 