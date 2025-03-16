@echo off
echo Committing and pushing changes...
git add .
git commit -m "Remove delay when mouse leaves flip card"
git push
echo Done!
pause 