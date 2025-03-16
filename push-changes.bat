@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: improve disc swapping, show background discs, fix spinning animation, move disc up"
git push
echo Done!
pause 