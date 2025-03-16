@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: make center area black, remove gray border, improve image visibility"
git push
echo Done!
pause 