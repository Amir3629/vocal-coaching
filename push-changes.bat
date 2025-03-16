@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix enhanced music player: Remove YouTube integration to fix GitHub Pages deployment"
git push
echo Done!
pause 