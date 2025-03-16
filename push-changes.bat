@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: move title further down, fix disc swapping mechanism"
git push
echo Done!
pause 