@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix About section: Restore expanded content and statistics when clicking Mehr erfahren"
git push
echo Done!
pause 