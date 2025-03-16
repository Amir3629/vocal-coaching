@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix flip card issues: slower animation, longer display time, and square aspect ratio"
git push
echo Done!
pause 