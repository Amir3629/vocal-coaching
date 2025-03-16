@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: make disc spin only when playing, improve disc swapping, move title above disc"
git push
echo Done!
pause 