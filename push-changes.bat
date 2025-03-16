@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix smooth transitions: slower card animations (5s), prevent background jumps, update CVT logo link"
git push
echo Done!
pause 