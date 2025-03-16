@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix UI issues: prevent word break in notification, improve service card animations with smooth scrolling"
git push
echo Done!
pause 