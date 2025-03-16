@echo off
echo Committing and pushing changes...
git add .
git commit -m "Move track title below the disc to match design reference"
git push
echo Done!
pause 