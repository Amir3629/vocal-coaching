@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: add back vinyl grooves, prioritize image loading, keep outer border removed"
git push
echo Done!
pause 