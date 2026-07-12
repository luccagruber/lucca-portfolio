# Serves the prebuilt static export (out/). The Next build runs on the dev
# machine (`npm run build`) because the 1 GB OCI VM can't build it reliably.
FROM caddy:2-alpine
COPY out /usr/share/caddy
EXPOSE 80
