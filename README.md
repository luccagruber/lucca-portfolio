# Lucca Gruber Rodrigues — Portfolio

React + Vite + Tailwind. All content (projects, about, contact) is in **`src/data/projects.js`** — edit that one file to update the site.

## Local dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Deploy on OCI with Docker

```bash
docker compose up -d --build
```

The container serves the site on `127.0.0.1:8080`. Point your host Caddy at it:

```caddyfile
yourname.duckdns.org {
    reverse_proxy 127.0.0.1:8080
}
```

Caddy handles HTTPS automatically for the duckdns domain.
