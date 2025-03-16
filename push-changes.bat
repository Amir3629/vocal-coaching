@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix word break in contact form and synchronize service card animations with scroll"
git push
echo Done!
pause 