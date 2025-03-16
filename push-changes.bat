@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix multiple UI issues: contact form notification timing, music player disc visibility, and play button color"
git push
echo Done!
pause 