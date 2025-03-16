@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: Ensure only current disc spins by stopping all animations when changing tracks"
git push
echo Done!
pause 