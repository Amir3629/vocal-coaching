@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix image zoom and scroll issues: remove scale effect, prevent scroll jumps, add smooth transitions"
git push
echo Done!
pause 