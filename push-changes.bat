@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix type error in enhanced-music-player.tsx for GitHub Pages deployment"
git push
echo Done!
pause 