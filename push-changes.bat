@echo off
echo Committing and pushing changes...
git add .
git commit -m "Implement service-specific booking form with dynamic fields"
git push
echo Done!
pause 