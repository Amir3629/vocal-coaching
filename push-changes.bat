@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: completely revise disc swapping for smooth carousel effect"
git push
echo Done!
pause 