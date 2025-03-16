@echo off
echo Committing and pushing changes...
git add .
git commit -m "Replace YouTube-based music player with simplified audio player"
git push
echo Done!
pause 