@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix build error: Replace booking-modal with booking-form component"
git push
echo Done!
pause 