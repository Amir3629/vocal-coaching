@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix browser errors: Add path utilities and enhanced audio component"
git push
echo Done!
pause 