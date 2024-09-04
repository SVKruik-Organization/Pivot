#!/bin/sh
export HOME=/home/SVKruik
export PATH=/root/.nvm/versions/node/v20.15.1/bin:$PATH

# Git
cd ..
git config --global --add safe.directory /home/SVKruik/Documents/GitHub/Pivot
git reset --hard
git pull
echo "Git setup complete"

# Pivot - url.skpvt.io
npm install
npm run build
[ -d logs ] || mkdir logs
[ -d data ] || mkdir data && touch data/routes.json && echo '{}' >data/routes.json
echo "Pivot update complete. Reloading server."

sudo systemctl restart pivot-api.service
