@echo off
echo Committing and pushing changes...
git add .
git commit -m "Multiple fixes: 1) Remove 'Weniger anzeigen' option in About section, 2) Make gallery transitions smoother, 3) Prevent music and video from playing simultaneously, 4) Make disc only clickable in center, 5) Fix CVT logo link"
git push
echo Done!
pause 