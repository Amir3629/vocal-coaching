@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix type error in music-player.tsx: Create separate handler for button click to resolve type incompatibility"
git push
echo Done!
pause 