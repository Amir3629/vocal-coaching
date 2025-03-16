@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix gallery and music player: Move close button outside frame, ensure only current disc spins"
git push
echo Done!
pause 