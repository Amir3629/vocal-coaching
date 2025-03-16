@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: remove duplicate title from page.tsx, improve disc swapping, fix positioning"
git push
echo Done!
pause 