@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix duplicate booking form: Remove standalone section and keep only modal functionality"
git push
echo Done!
pause 