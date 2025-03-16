@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix statistics icons in About section"
git push
echo Done!
pause 