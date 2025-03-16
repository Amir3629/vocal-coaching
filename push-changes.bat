@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: move title below disc, improve disc swapping, adjust disc position"
git push
echo Done!
pause 