@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix remaining issues: 1) Fix CVT logo in collaborations, 2) Improve gallery transitions with smoother animations, 3) Fix image navigation in gallery"
git push
echo Done!
pause 