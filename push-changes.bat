@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix About section layout: Move text to right side of image"
git push
echo Done!
pause 