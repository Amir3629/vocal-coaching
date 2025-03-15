@echo off
echo Adding files to git...
git add .

echo Committing changes...
git commit -m "Add mock i18n implementation and module declarations"

echo Pushing changes to GitHub...
git push origin main

echo Done! 