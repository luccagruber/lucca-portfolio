# Engineering Report — Portfolio Rebuild

_2026-07-12 · rebuild of the repository against `Portfolio Vision.md` and
`Experience Architecture.md`_

## 1. Product understanding

The portfolio is a single interactive metaphor: the visitor stands in front
of Lucca's corporate cubicle. The filing cabinet beside the desk is the
protagonist; the two projects physically exist as manila folders inside its
top drawer. A small scroll *triggers* (never scrubs) the one cinematic
sequence — drawer opens, camera eases in, folders rise — after which the
scene is calm again. Opening a folder presents a corporate project report,
paged by clicks with scrolling disabled. Closing it returns the folder.
Scrolling on simply carries the workspace away into a plain, usability-first
About/Contact. Exactly two projects exist: **Accul Rebugr** (black `#0B0B0B`
/ moss `#4A6741`) and **Gruber Goal** (petrol `#00303F` / brick `#A93226` /
off-white `#F5F5F5`) — their colors appear only inside their opened files.
The workspace itself is permanently neutral.

## 2. Audit of the previous implementation

The repo contained a conventional dark-themed one-page portfolio
(Vite + React 18 + Tailwind 3: hero, project cards with expandables,
about, contact) — a different concept that contradicts the vision (hero
section, card paradigm, scroll-reveal storytelling, saturated dark-moss
identity everywhere). It also committed `node_modules/` and `dist/`
(4,100+ files) with no `.gitignore`.

**Decisions:**

| Area | Decision |
| --- | --- |
| All UI components (Hero, ProjectCard, FeaturedProject, Projects, Expandable, useReveal) | **Deleted** — the card/hero paradigm is incompatible with the vision |
| Vite toolchain (vite/tailwind3/postcss configs, index.html, main.jsx) | **Deleted**, replaced by Next.js 16 + Tailwind 4 |
| `src/data/projects.js` content | **Reused fully** — restructured into typed report pages; the standalone "Shipping Label Automation" project became a chapter of the Gruber Goal file (it was built for that business), preserving "exactly two folders" |
| About/contact copy, tagline | **Reused** in the traditional act (tagline became the About heading; the old hero is gone by design) |
| Contact placeholders (`lucca@example.com`, dummy LinkedIn/GitHub) | **Replaced** with the real email; socials left as commented template lines until real URLs exist |
| Docker/Caddy deployment for OCI | **Kept**, adjusted to serve Next's `out/` instead of Vite's `dist/` |
| Fraunces font | **Dropped** — a serif display voice doesn't fit the neutral corporate metaphor; Inter (body) + IBM Plex Mono (file labels) carry it |
| `node_modules`, `dist` in git | **Untracked**, `.gitignore` added |
| Vision docs at repo root | **Moved** to `docs/` with clean names |

Nothing from the old implementation was worth keeping as code; its value was
the content, which was excellent and survives almost verbatim.

## 3. Architecture

**Stack:** Next.js 16 (App Router, TS strict, `output: "export"`), React 19,
React Three Fiber 9 + drei 10, GSAP 3.15 (+ `@gsap/react`), Zustand 5,
Tailwind 4. Static export keeps the existing Docker + Caddy deployment
(no server runtime to operate).

**The doc's law — React owns state, GSAP owns animations, R3F owns
rendering — is implemented literally:**

- `experience/state/store.ts` — one Zustand machine. Drawer:
  `closed → opening → open → closing`. Viewer: `closed → folder-lifting →
  opening → viewing → closing → folder-returning`. Every `*ing` phase is
  entered by a user event and exited only by the owning system's animation
  completion callback (`drawerOpened()`, `folderLifted()`, …). Guards make
  illegal transitions no-ops. Folder phases (hidden/revealed/selected/
  returning) are **derived** from the machine so there is exactly one source
  of truth.
- `experience/hooks/useScrollDirector.ts` — scroll is a *trigger*: ≥120 px
  opens the drawer; back at the top closes it (armed only after real
  scrolling, so a cabinet click at the top isn't instantly reversed). It
  re-evaluates on transition settle, handling "reached top while still
  opening". Arriving mid-page (reload/anchor) restores state instantly.
- Each 3D system animates only itself in response to phases: **Drawer**
  owns the slide and the folder-anchor reveal (the doc assigns "revealing
  folders" to the drawer); **Folder** owns hover/lift/return of its own
  body; **CameraRig** eases between named framings and gates nothing;
  **ProjectViewer** (DOM) owns the report entrance/exit. All timelines
  call `invalidate()` — the canvas runs `frameloop="demand"` so the GPU is
  idle whenever the scene is static.

**Scroll model:** the stage section is 250 svh tall with a sticky viewport.
This guarantees the triggered sequence is actually witnessed and the open
drawer can be explored, then the workspace scrolls away naturally with the
document — the vision's "no cinematic transition" honored without any
scroll hijacking. While the viewer is open, page scroll is hard-locked;
navigation is clicks (and arrow keys), with Escape/backdrop/× to close.

**The report is DOM, not 3D.** The folder lifts in 3D, projects its screen
position, and hands off to an overlay that scales in from that exact point.
Typography stays crisp, text is real (selectable, screen-readable), focus is
trapped, and identity colors arrive as CSS variables scoped to the viewer
root — enforcing "project colors never appear outside project files" at the
code level. Workspace remains visible behind a soft blur as context.

**Scene:** fully parametric geometry (rounded boxes, cylinders, extrusions)
— no GLTF pipeline, tiny bundle, everything tunable in code. Soft key light
+ fill + a procedural Lightformer environment (no external HDR fetch) +
contact shadows give the stylized product-render look. Composition
constants live in `scene/layout.ts`; every duration/ease in `motion.ts`.
A desk nameplate identifies whose workspace this is (there is no hero to do
it); the top drawer carries a diegetic "PROJECTS" label. Clicking the
cabinet also opens it — same machine event as the scroll trigger.

**Accessibility & resilience:** visually-hidden focusable buttons drive the
same store events as the 3D scene (keyboard/SR path); `aria-live` announces
the drawer state; the viewer is a proper `role="dialog"` with focus trap and
restore; `prefers-reduced-motion` renders end states instantly everywhere;
a `<noscript>` block lists both projects; portrait screens pull the camera
back horizontally so the composition survives mobile.

## 4. Project structure

```
docs/                       vision, architecture, this report
public/fonts/               two vendored OFL .woff files (in-scene text only)
src/
  app/                      layout (next/font, metadata), page, globals.css
  content/                  types.ts · projects.ts (two reports) · profile.ts
  experience/
    Experience.tsx          sticky stage, scroll director/lock, a11y, noscript
    ExperienceCanvas.tsx    client-only dynamic canvas loader
    motion.ts               durations · eases · scroll thresholds
    state/store.ts          the machine
    hooks/                  useScrollDirector · useScrollLock
    scene/                  Scene · CameraRig · Lighting · layout.ts · fonts.ts
      workspace/            Desk · Partition · props (cup, pens, frame, paper, nameplate)
      cabinet/              FilingCabinet · Drawer · DrawerFront
      folders/              ProjectFolders · Folder
    viewer/                 ProjectViewer (dialog) · ReportPage (block renderer)
  portfolio/                About · Contact · Footer
  lib/                      palette.ts · motion-prefs.ts
```

## 5. Verification performed

- `tsc --noEmit`, `eslint`, `next build` — all clean.
- Full headless-Chrome walkthrough of the built site (hardware GL):
  arrival → scroll-trigger → drawer opens with folders rising → folder
  select → Accul report (7 pages, paging works) → Escape → folder returns →
  Gruber report → traditional act → back-to-top reverse. Zero console
  errors. Screenshots of the closed→open→closed round trip are
  byte-identical to the originals — the machine restores state exactly.
- Mobile (390×844) verified: composition holds, report fully usable.

## 6. Technical risks & watch items

1. **Software-GL environments crawl.** Under SwiftShader (no GPU) each
   frame takes ~1s, and GSAP's lag smoothing makes sequences appear frozen
   (diagnosed during verification; on hardware GL everything is real-time).
   Real-world impact is limited to GPU-less VMs, but a loading/perf
   fallback (e.g., detect `WEBGL_debug_renderer_info`, skip to instant
   transitions) is a sensible hardening step.
2. **Parametric scene vs. art direction ceiling.** Primitives get ~90% of
   the stylized-render look; the last 10% (bevel wear, fabric texture,
   imperfect edges) wants a Blender-authored GLTF. The architecture
   isolates this: only `scene/workspace|cabinet|folders` internals would
   change.
3. **Report content is client-rendered.** Crawlers see name/about/contact
   (server-rendered) and the noscript summary, not full report text. Fine
   for a portfolio; if SEO on project detail ever matters, mirror pages
   can be generated from `content/projects.ts`.
4. **Report pages must fit without scrolling** (vision). Current copy fits
   comfortably at ≥360 px width; the content column has an overflow-auto
   safety valve for extreme viewports. Keep future page copy short — the
   block model encourages it.
5. **`next` bundles a postcss version with two moderate advisories**
   (affects all current Next releases; build-time only for a static site).
   Track upstream.
6. **Placeholder socials** — LinkedIn/GitHub entries are commented out in
   `content/profile.ts` until real URLs exist.

## 7. Deployment (2026-07-12)

The site is live at **https://lucca-portifolio.duckdns.org** (DuckDNS →
OCI VM). The original plan — build the Next export inside Docker on the VM
(root `Dockerfile` + `docker-compose.yml`) — was dropped: the VM has 1 GB of
RAM and already runs production containers (Caddy, n8n, Postgres,
accul-reburg-api), so `next build` there risks OOM. Those files were removed
in favor of `deploy/`:

- `deploy/deploy.sh` — builds `out/` locally, rsyncs it to the VM, builds
  `deploy/Dockerfile` (a `caddy:2-alpine` image serving the static files),
  and runs it as container `lucca-portfolio` on the `n8n_network` Docker
  network.
- Routing/TLS: the VM's existing dockerized Caddy got a
  `lucca-portifolio.duckdns.org { reverse_proxy lucca-portfolio:80 }` block
  in `~/Caddyfile`; certificates are auto-provisioned.

Also verified post-deploy on hardware GL: risk #1's fallback detection does
**not** misfire on real GPUs (a Mesa Intel renderer string is correctly left
on the 3D path), and the full 3D flow works on the built site. The "3D never
worked in local dev" symptom was software WebGL on the dev browser — exactly
risk #1 — now answered by the 2D fallback rather than a frozen scene.

## 8. Recommended next steps

1. **Sound of the drawer** — a single, quiet metal-glide sample on
   open/close (respecting reduced motion / a mute) would deepen the
   metaphor cheaply.
2. **Folder-open micro-moment** — the folder could visibly hinge open for
   ~150 ms before the report hand-off.
3. **GLTF art pass** when the composition feels final (risk #2).
4. **Domain + metadata pass** — set `metadataBase`, OG image (a render of
   the workspace), favicon variants.
5. **Analytics-free feedback** — the vision's success criterion is
   subjective; a lightweight session replay or plain user testing on the
   drawer-discovery moment would validate "the interaction teaches itself".
