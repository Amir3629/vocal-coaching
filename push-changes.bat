@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: integrate YouTube thumbnails as disc images, add all 7 tracks"
git push
echo Done!
pause 