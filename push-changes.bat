@echo off
echo Committing and pushing changes...
git add .
git commit -m "Fix duplicate title and CVT link: remove duplicate 'Faszinierend & Musikalisch' title from flip-cards, update CVT link in collaborations"
git push
echo Done!
pause 