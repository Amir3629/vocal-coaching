@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix CVT Deutschland logo: Restore the CVT Deutschland logo with correct link to https://cvtdeutschland.de/de"
git push
echo Done!
pause 