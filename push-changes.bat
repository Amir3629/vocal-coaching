@echo off
echo Committing and pushing changes...
git add .
git commit -m "Remove gallery close button: Allow closing images by clicking anywhere on the background"
git push
echo Done!
pause 