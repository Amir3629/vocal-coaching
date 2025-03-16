@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix gallery image closing: Allow closing images by clicking anywhere on the image"
git push
echo Done!
pause 