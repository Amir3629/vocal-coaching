@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix music player: improve disc carousel with overlapping, progressive scaling, and smoother transitions"
git push
echo Done!
pause 