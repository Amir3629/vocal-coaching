@echo off
echo Committing and pushing changes...
git add .
git commit -m "Implement proper disc swapping: show discs only when dragging, improve image quality, fix sizing"
git push
echo Done!
pause 