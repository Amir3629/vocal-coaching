@echo off
echo Committing and pushing changes...
git add .
git commit -m "Make card closing animation slower (3 seconds) than opening animation (2 seconds)"
git push
echo Done!
pause 