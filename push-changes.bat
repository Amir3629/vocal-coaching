@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix gallery, music player, and booking form: Move close button outside frame, ensure only current disc spins, remove conflicting booking files"
git push
echo Done!
pause 