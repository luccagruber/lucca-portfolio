# Lucca Gruber Rodrigues — Portfolio

An interactive workspace, not a website. Visitors arrive at a stylized 3D
corporate cubicle; the two project files live in the filing cabinet and open
into corporate reports. Below the workspace, a traditional About/Contact.

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
    scene/        Canvas, camera rig, lighting, workspace geometry,
                  cabinet + drawer, folders
    viewer/       the corporate report overlay (DOM, click-paged)
    motion.ts     every duration, ease, and scroll threshold
  portfolio/      the traditional act — About, Contact, Footer
  lib/            palette (3D color source of truth), reduced-motion
```

To edit site copy, edit `src/content/` only. To retune animation feel, edit
`src/experience/motion.ts`. To recompose the scene, edit
`src/experience/scene/layout.ts`.

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

```bash
docker compose up -d --build
```

The container serves the site on `127.0.0.1:8080`; point the host Caddy at it:

```caddyfile
yourdomain.example {
    reverse_proxy 127.0.0.1:8080
}
```

## Notes

- `public/fonts/` contains two vendored OFL-licensed `.woff` files used only
  for in-scene (troika) text — folder tabs and the nameplate. The DOM loads
  Inter and IBM Plex Mono through `next/font` at build time.
- Project identity colors (Accul Rebugr, Gruber Goal) are defined with their
  content in `src/content/projects.ts` and are applied only inside the
  report viewer — the workspace itself stays neutral by design.
