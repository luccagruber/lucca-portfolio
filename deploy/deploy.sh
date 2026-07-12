#!/usr/bin/env bash
# Build locally, ship the static export to the OCI VM, and (re)start the
# container on the shared Docker network the host's Caddy proxies over.
# Requires: ssh host alias "oci-server" (see ~/.ssh/config).
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

ssh oci-server 'mkdir -p ~/lucca-portfolio'
rsync -az --delete out/ oci-server:~/lucca-portfolio/out/
rsync -az deploy/Dockerfile oci-server:~/lucca-portfolio/Dockerfile

ssh oci-server '
  set -e
  cd ~/lucca-portfolio
  docker build -t lucca-portfolio .
  docker rm -f lucca-portfolio 2>/dev/null || true
  docker run -d --name lucca-portfolio --restart unless-stopped \
    --network n8n_network lucca-portfolio
'
echo "Deployed. Site: https://lucca-portifolio.duckdns.org"
