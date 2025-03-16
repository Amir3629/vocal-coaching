@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix notification text display and improve service card scroll behavior"
git push
echo Done!
pause 