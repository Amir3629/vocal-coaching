@echo off
echo Committing and pushing changes...
git add .
git commit -m "Restore vinyl disc design to music player while keeping fixes"
git push
echo Done!
pause 