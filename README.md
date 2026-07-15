# Lucca Gruber Rodrigues — Portfolio

An interactive workspace, not a website. Visitors sit directly in front of
a real 3D desk; the two project files live in its drawer and open into
physical corporate reports read inside the folder itself. The camera never
follows the mouse — scroll does exactly one thing: it opens the drawer.
Below the workspace, a traditional About/Contact.

The product definition lives in **`docs/Portfolio Vision.md`** and
**`docs/Experience Architecture.md`** — those two documents are the source
of truth for every design and architecture decision. An audit of how this
implementation maps to them is in `docs/Engineering Report.md`.

## Stack

- **Next.js 16** (App Router, TypeScript, static export)
- **React Three Fiber + drei** — rendering (demand frameloop; GPU idles when the scene is static)
- **GSAP** — every animation; event-driven timelines, never scroll-scrubbed
- **Zustand** — the experience state machine (drawer / folders / viewer phases)
- **Tailwind CSS 4** — DOM styling and design tokens

Division of responsibility (from the architecture doc): **React owns state,
GSAP owns animations, R3F owns rendering.**

## Layout

```
src/
  app/            Next.js shell — layout, page, global tokens
  content/        ALL copy: the two project reports, profile, contact
  experience/     the immersive act
    state/        Zustand state machine (single source of truth)
    hooks/        scroll director (trigger, not scrub), scroll lock
    scene/        Canvas, camera rig (static, straight-on), lighting, room,
                  desk/ (GLB model + its drawer), folders/, generated props
    viewer/       the open-folder report (DOM; hinged cover, fastened
                  pages, physical click-paged turns)
    motion.ts     every duration, ease, and scroll threshold
  portfolio/      the traditional act — About, Contact, Footer
  lib/            palette (3D color source of truth), reduced-motion
```

To edit site copy, edit `src/content/` only. To retune animation feel, edit
`src/experience/motion.ts`. To recompose the scene, edit
`src/experience/scene/layout.ts`.

## 3D assets

The desk is a real GLB: [“Office Desk 140x60” by AleixoAlonso](https://sketchfab.com/3d-models/office-desk-140x60-9262f311271c4c4390341e526d3fe103)
(CC BY 4.0, credited in the footer). The original download lives in
`lucca-portifolio-3d-assets/` (untracked); the shipped copy at
`public/models/office-desk.glb` has its textures resized to 2048px and
WebP-compressed via `@gltf-transform/cli` (23 MB → 2.3 MB):

```bash
npx @gltf-transform/cli resize in.glb tmp.glb --width 2048 --height 2048
npx @gltf-transform/cli webp tmp.glb tmp2.glb --slots "{baseColorTexture,metallicRoughnessTexture}" --quality 82
npx @gltf-transform/cli webp tmp2.glb out.glb --slots "normalTexture" --quality 90
```

The desk props (closed MacBook Pro, notebook with pen, glasses, Starbucks paper cup) are Sketchfab GLBs from
`lucca-portifolio-3d-assets/`, optimized the same way (resize to 1024 +
WebP) and normalized at load by `scene/workspace/props/GlbProp.tsx`.
**TODO: add source links/attribution for each** (required if CC-BY). Note: skip `optimize --simplify` on the MacBook — it collapses its thin-shell geometry.
The nameplate, picture frame and manila folders are generated in R3F.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run preview    # serve out/ locally
npm run lint
npm run typecheck
```

## Deploy (OCI, Docker + Caddy)

Live at **https://lucca-portifolio.duckdns.org**.

```bash
./deploy/deploy.sh
```

The script builds the static export **locally** (the 1 GB OCI VM cannot run
`next build` reliably), rsyncs `out/` to the VM (ssh alias `oci-server`),
builds a minimal `caddy:2-alpine` image there (`deploy/Dockerfile`), and runs
it as container `lucca-portfolio` on the `n8n_network` Docker network. The
VM's existing dockerized Caddy terminates TLS and routes to it via
`~/Caddyfile` on the VM:

```caddyfile
lucca-portifolio.duckdns.org {
    reverse_proxy lucca-portfolio:80
}
```

After editing that file, reload with
`docker exec -w /etc/caddy caddy caddy reload --config /etc/caddy/Caddyfile`.

## Notes

- `public/fonts/` contains two vendored OFL-licensed `.woff` files used only
  for in-scene (troika) text — folder tabs and the nameplate. The DOM loads
  Inter and IBM Plex Mono through `next/font` at build time.
- Project identity colors (Accul Rebugr, Gruber Goal) are defined with their
  content in `src/content/projects.ts` and are applied only inside the
  report viewer — the workspace itself stays neutral by design.
