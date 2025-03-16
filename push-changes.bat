@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix form validation: add shake animation instead of browser alerts, update section title to 'Faszinierend & Musikalisch', verify CVT link"
git push
echo Done!
pause 