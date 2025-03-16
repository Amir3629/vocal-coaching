@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: remove duplicate title, improve disc swapping, fix positioning"
git push
echo Done!
pause 