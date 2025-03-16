@echo off
echo Committing and pushing changes...
git add .
git commit -m "Improve service card animations with slower transitions and better scroll timing"
git push
echo Done!
pause 