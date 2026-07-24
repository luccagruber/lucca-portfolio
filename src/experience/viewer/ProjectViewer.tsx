"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { reportById } from "@/content/projects";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale";
import type { ProjectId, ProjectReport } from "@/content/types";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE, SEQ } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { FOLDER, FOLDER_FULL_H, FOLDER_SLOTS } from "@/experience/scene/layout";
import { ReportPage } from "./ReportPage";

/**
 * The project viewer: the manila folder itself, now DOM. The 3D folder
 * flies to the camera and hands off its exact screen quad; the DOM folder
 * mounts over it pixel-for-pixel, its front cover rotates open on a real
 * CSS hinge, and the report is read inside the open folder — left panel
 * the inside cover (index), right panel the fastened page stack.
 *
 * Page turns work exactly like the cover: the current sheet rotates on a
 * Y-axis hinge at its left edge with the same weighted ease, and — like a
 * real book — the back of the turning sheet carries the next page's
 * content, so the turn itself reveals it. PREV turns the sheet back the
 * other way. Navigation is clicks only (arrows, page edges, the index)
 * plus keyboard arrows; scroll stays locked while viewing.
 */
export function ProjectViewer() {
  const viewer = useExperience((s) => s.viewer);
  const activeProject = useExperience((s) => s.activeProject);
  if (viewer === "closed" || !activeProject) return null;
  return <ProjectViewerBody activeProject={activeProject} />;
}

/** Local page-flip state: which sheet is mid-air and what sits under it. */
interface Flip {
  sheet: number;
  under: number;
  dir: 1 | -1;
}

/**
 * Reading the language here rather than in `ProjectViewer` keeps the early
 * return above free of hooks: the dialog is what needs the words, and it
 * only exists once a file has been chosen.
 */
function ProjectViewerBody({ activeProject }: { activeProject: ProjectId }) {
  const locale = useLocale();
  return <FolderDialog report={reportById(activeProject, locale)} />;
}

function FolderDialog({ report }: { report: ProjectReport }) {
  const t = ui[useLocale()];
  const viewer = useExperience((s) => s.viewer);
  const storePage = useExperience((s) => s.page);
  const closeProject = useExperience((s) => s.closeProject);
  // In fallback mode there is no canvas veil behind — the dialog carries
  // its own scrim so the workspace still steps back.
  const webglFallback = useExperience((s) => s.webglFallback);

  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const shifterRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const coverShadeRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const flipTl = useRef<gsap.core.Timeline | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const [flip, setFlip] = useState<Flip | null>(null);

  const pages = report.pages;
  const total = pages.length;
  const current = Math.min(storePage, total - 1);
  /** While a backward sheet is falling, the old page stays visible under it. */
  const basePage = flip && flip.dir === -1 ? flip.under : current;
  const tabSide = FOLDER_SLOTS[report.id].tabX < 0 ? "left" : "right";

  const identityVars = {
    "--report-bg": report.identity.background,
    "--report-ink": report.identity.ink,
    "--report-ink-soft": report.identity.inkSoft,
    "--report-accent": report.identity.accent,
    "--report-accent-bright": report.identity.accentBright,
    "--report-rule": report.identity.rule,
  } as CSSProperties;

  /** Click-navigation — the only way pages move. Fast-forwards a live flip. */
  const nav = (target: number) => {
    const s = useExperience.getState();
    if (s.viewer !== "viewing") return;
    const from = s.page;
    if (target === from || target < 0 || target >= total) return;
    flipTl.current?.progress(1).kill();
    flipTl.current = null;
    s.goToPage(target);
    if (prefersReducedMotion()) {
      setFlip(null);
      return;
    }
    setFlip(
      target > from
        ? { sheet: from, under: target, dir: 1 }
        : { sheet: target, under: from, dir: -1 },
    );
  };

  // Capture focus for the dialog's lifetime; give it back on close.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    folderRef.current?.focus({ preventScroll: true });
    return () => restoreFocusRef.current?.focus?.();
  }, []);

  // Escape closes, arrows page, Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useExperience.getState();
      if (e.key === "Escape") {
        s.closeProject();
        return;
      }
      if (e.key === "Tab") {
        const root = rootRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !root.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.key === "ArrowRight") nav(useExperience.getState().page + 1);
      if (e.key === "ArrowLeft") nav(useExperience.getState().page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  /** Where the folder body sits when closed: the 3D hand-off quad. */
  const closedPose = () => {
    const folder = folderRef.current;
    const apex = useExperience.getState().apex;
    if (!folder || !apex) return { dx: 0, dy: 0, scale: 0.94 };
    const bodyFrac = FOLDER.height / FOLDER_FULL_H;
    const bodyHPx = (apex.h / 100) * window.innerHeight * bodyFrac;
    // apex.y centers the full silhouette (tab included); the body center
    // sits lower by half the tab's share.
    const bodyCenterY = apex.y + (apex.h * (1 - bodyFrac)) / 2;
    return {
      dx: ((apex.x - 50) / 100) * window.innerWidth,
      dy: ((bodyCenterY - 50) / 100) * window.innerHeight,
      scale: bodyHPx / Math.max(folder.offsetHeight, 1),
    };
  };

  const spreadShift = () => {
    const folder = folderRef.current;
    if (!folder || !window.matchMedia("(min-width: 640px)").matches) return 0;
    return folder.offsetWidth / 2;
  };

  // Phase-driven enter/exit. Completions feed the machine.
  useGSAP(
    () => {
      const layer = layerRef.current;
      const mover = moverRef.current;
      const shifter = shifterRef.current;
      const cover = coverRef.current;
      const shade = coverShadeRef.current;
      const chrome = chromeRef.current;
      if (!layer || !mover || !shifter || !cover || !shade || !chrome) return;
      const d = (x: number) => (prefersReducedMotion() ? 0 : x);

      if (viewer === "folder-lifting") {
        // The 3D folder is still flying; nothing DOM is visible yet.
        gsap.set(layer, { autoAlpha: 0 });
      } else if (viewer === "opening") {
        const { dx, dy, scale } = closedPose();
        const tl = gsap.timeline({
          onComplete: () => useExperience.getState().viewerOpened(),
        });
        tl.set(layer, { autoAlpha: 1 })
          .set(chrome, { autoAlpha: 0 })
          .fromTo(
            mover,
            { x: dx, y: dy, scale },
            { x: 0, y: 0, scale: 1, duration: d(DUR.viewerGrow), ease: EASE.enter, overwrite: "auto" },
            0,
          )
          .fromTo(
            cover,
            { rotationY: -2, transformOrigin: "0% 50%" },
            {
              rotationY: -178,
              duration: d(DUR.coverOpen),
              ease: "power2.inOut",
              overwrite: "auto",
            },
            d(SEQ.coverOverlap),
          )
          .to(
            shade,
            { opacity: 0, duration: d(DUR.coverOpen * 0.7), ease: "power1.out" },
            d(SEQ.coverOverlap + 0.1),
          )
          .to(
            shifter,
            { x: spreadShift(), duration: d(DUR.coverOpen), ease: EASE.glide },
            d(SEQ.coverOverlap + 0.05),
          )
          .fromTo(
            chrome,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: d(0.35), ease: EASE.enter },
            d(SEQ.coverOverlap + DUR.coverOpen * 0.55),
          );
      } else if (viewer === "closing") {
        const { dx, dy, scale } = closedPose();
        const tl = gsap.timeline({
          onComplete: () => useExperience.getState().viewerDismissed(),
        });
        tl.to(chrome, { autoAlpha: 0, y: 6, duration: d(0.15), ease: EASE.exit, overwrite: "auto" }, 0)
          .to(
            cover,
            {
              rotationY: -2,
              transformOrigin: "0% 50%",
              duration: d(DUR.coverClose),
              ease: "power2.inOut",
              overwrite: "auto",
            },
            0,
          )
          .to(shade, { opacity: 1, duration: d(DUR.coverClose * 0.6), ease: "power1.in", overwrite: "auto" }, d(0.1))
          .to(shifter, { x: 0, duration: d(DUR.coverClose), ease: EASE.glide, overwrite: "auto" }, 0)
          .to(
            mover,
            { x: dx, y: dy, scale, duration: d(DUR.viewerShrink), ease: EASE.exit, overwrite: "auto" },
            d(DUR.coverClose * 0.5),
          )
          .to(layer, { autoAlpha: 0, duration: d(0.1), overwrite: "auto" }, ">-0.02");
      }
      // "viewing": steady state. "folder-returning": layer is already
      // hidden; the 3D folder carries the moment home.
    },
    { dependencies: [viewer] },
  );

  // The page turn — the cover's hinge principle applied to a sheet. Same
  // Y-axis rotation, same weighted ease; the sheet's back face carries the
  // destination page, so mid-turn reads like a real book. Once flat it
  // fades, leaving the base page it just revealed.
  useGSAP(
    () => {
      if (!flip) return;
      const sheet = sheetRef.current;
      const sweep = sweepRef.current;
      if (!sheet || !sweep) return;
      const tl = gsap.timeline({ onComplete: () => setFlip(null) });
      if (flip.dir === 1) {
        tl.fromTo(
          sheet,
          { rotationY: 0, autoAlpha: 1, transformOrigin: "0% 50%" },
          { rotationY: -178, duration: DUR.pageTurn, ease: "power2.inOut" },
          0,
        )
          .to(sheet, { autoAlpha: 0, duration: 0.12, ease: "power1.in" }, ">-0.06")
          .fromTo(
            sweep,
            { opacity: 0 },
            { opacity: 0.24, duration: DUR.pageTurn * 0.5, ease: "power1.out" },
            0,
          )
          .to(sweep, { opacity: 0, duration: DUR.pageTurn * 0.5, ease: "power1.in" }, ">");
      } else {
        tl.fromTo(
          sheet,
          { rotationY: -178, autoAlpha: 0, transformOrigin: "0% 50%" },
          { rotationY: -178, autoAlpha: 1, duration: 0.05 },
          0,
        )
          .to(sheet, { rotationY: 0, duration: DUR.pageTurn, ease: "power2.inOut" }, ">")
          .fromTo(
            sweep,
            { opacity: 0 },
            { opacity: 0.2, duration: DUR.pageTurn * 0.5, ease: "power1.out" },
            0.05,
          )
          .to(sweep, { opacity: 0, duration: DUR.pageTurn * 0.5, ease: "power1.in" }, ">");
      }
      flipTl.current = tl;
      return () => {
        tl.kill();
      };
    },
    { dependencies: [flip] },
  );

  const atFirst = current === 0;
  const atLast = current === total - 1;
  const navButton =
    "font-sans text-[10px] tracking-[0.18em] text-tab-ink/70 transition-colors hover:text-tab-ink disabled:pointer-events-none disabled:opacity-35";

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Project file: ${report.name}`}
      style={identityVars}
      className="fixed inset-0 z-50"
    >
      {/* Click-out — the veil behind already dims the workspace */}
      <div
        ref={layerRef}
        className={`absolute inset-0 opacity-0 ${
          webglFallback ? "bg-stage/60 backdrop-blur-md" : ""
        }`}
        onClick={() => closeProject()}
      >
        <div className="absolute inset-0 grid place-items-center overflow-hidden [perspective:1500px]">
          <div ref={moverRef} className="will-change-transform">
            <div ref={shifterRef} className="will-change-transform">
              <div
                ref={folderRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="relative w-(--fw) outline-none [--fw:min(26rem,88vw,44svh)] sm:[--fw:min(26rem,46vw,44svh)] [perspective:1400px]"
                style={{ height: "calc(var(--fw) * 1.25)" }}
              >
                {/* ——— Back cover (the folder body) ——— */}
                <div className="absolute inset-0 rounded-md bg-linear-150 from-manila to-manila-deep shadow-[0_50px_100px_-24px_rgba(28,22,10,0.6)]" />

                {/* Tab — echoes the 3D folder's tab */}
                <div
                  className={`absolute -top-[4.4%] h-[4.6%] w-[42%] rounded-t-[6px] bg-manila ${
                    tabSide === "left" ? "left-[7%]" : "right-[7%]"
                  } flex items-center justify-center`}
                >
                  <span className="font-sans text-[9px] tracking-[0.2em] text-tab-ink/85">
                    {report.fileLabel}
                  </span>
                </div>

                {/* ——— The fastened page stack ——— */}
                <div className="absolute inset-x-[3%] top-[3%] bottom-[8.5%] [perspective:1400px] [perspective-origin:15%_50%] [transform-style:preserve-3d]">
                  {/* Sheets below the current one */}
                  <div className="absolute inset-0 translate-y-[5px] rounded-[3px] bg-(--report-bg) brightness-[0.82]" />
                  <div className="absolute inset-0 translate-y-[2.5px] rounded-[3px] bg-(--report-bg) brightness-[0.91]" />

                  {/* Base page (what the sheet lands on / reveals) */}
                  <div className="absolute inset-0 z-10 overflow-hidden rounded-[3px] shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                    <PageFace report={report} index={basePage} total={total} />
                    {/* Turn-shadow that sweeps while a sheet is mid-air */}
                    <div
                      ref={sweepRef}
                      className="pointer-events-none absolute inset-0 opacity-0 bg-linear-to-r from-black/40 via-black/10 to-transparent"
                    />
                  </div>

                  {/* The turning sheet — front is the page leaving, back is
                      the page arriving, like a real leaf of paper. */}
                  {flip ? (
                    <div
                      ref={sheetRef}
                      className="absolute inset-0 z-20 [transform-origin:0%_50%] [transform-style:preserve-3d] will-change-transform"
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-[3px] [backface-visibility:hidden] shadow-[0_10px_28px_rgba(0,0,0,0.3)]">
                        <PageFace report={report} index={flip.sheet} total={total} />
                      </div>
                      <div className="absolute inset-0 overflow-hidden rounded-[3px] [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_10px_28px_rgba(0,0,0,0.3)]">
                        <PageFace report={report} index={flip.under} total={total} />
                      </div>
                    </div>
                  ) : null}

                  {/* Two-prong fastener — pages are pinned at the top */}
                  <div className="absolute -top-[1.4%] left-1/2 z-30 flex h-[2.6%] w-[26%] -translate-x-1/2 items-center justify-between rounded-full bg-linear-to-b from-[#C9CDD3] to-[#9AA0A8] px-[12%] shadow-[0_1px_2px_rgba(0,0,0,0.35)] [transform:translateZ(6px)]">
                    <span className="size-[5px] rounded-full bg-[#7E848C] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                    <span className="size-[5px] rounded-full bg-[#7E848C] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                  </div>

                  {/* Page-edge click zones */}
                  <div ref={chromeRef} className="pointer-events-none absolute inset-0 z-20 opacity-0">
                    {!atFirst && viewer === "viewing" ? (
                      <div
                        aria-hidden
                        onClick={() => nav(current - 1)}
                        className="group pointer-events-auto absolute inset-y-[6%] left-0 w-[10%] cursor-pointer"
                      >
                        <div className="absolute inset-0 rounded-l-[3px] bg-linear-to-r from-black/15 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </div>
                    ) : null}
                    {!atLast && viewer === "viewing" ? (
                      <div
                        aria-hidden
                        onClick={() => nav(current + 1)}
                        className="group pointer-events-auto absolute inset-y-[6%] right-0 w-[10%] cursor-pointer"
                      >
                        <div className="absolute inset-0 rounded-r-[3px] bg-linear-to-l from-black/15 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* ——— Bottom manila lip: navigation ——— */}
                <div className="absolute inset-x-[5%] bottom-0 flex h-[8.5%] items-center justify-between">
                  <button
                    type="button"
                    className={navButton}
                    disabled={atFirst || viewer !== "viewing"}
                    onClick={() => nav(current - 1)}
                  >
                    ← {t.prev}
                  </button>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-tab-ink/60">
                    {t.page} {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    className={navButton}
                    disabled={atLast || viewer !== "viewing"}
                    onClick={() => nav(current + 1)}
                  >
                    {t.next} →
                  </button>
                </div>

                {/* ——— Front cover on its hinge ——— */}
                <div
                  ref={coverRef}
                  className="absolute inset-0 z-30 rounded-md [transform-origin:0%_50%] [transform-style:preserve-3d] will-change-transform"
                >
                  {/* Outside face — blank manila, like the real thing */}
                  <div className="absolute inset-0 rounded-md bg-linear-160 from-[#DECDA4] via-manila to-[#CDBA8C] shadow-[inset_-1px_0_2px_rgba(0,0,0,0.06)] [backface-visibility:hidden]">
                    <div className="absolute inset-y-0 left-0 w-[3%] rounded-l-md bg-linear-to-r from-black/12 to-transparent" />
                  </div>
                  {/* Inside face — the index */}
                  <div className="absolute inset-0 flex rotate-y-180 flex-col rounded-md bg-[#E7DAB8] p-[8%] [backface-visibility:hidden]">
                    <div className="absolute inset-y-0 right-0 w-[4%] bg-linear-to-l from-black/10 to-transparent" />
                    <p className="font-sans text-[9px] tracking-[0.24em] text-tab-ink/60">
                      PROJECT FILE
                    </p>
                    <h2 className="mt-2 font-display text-[22px] font-semibold tracking-tight text-tab-ink">
                      {report.name}
                    </h2>
                    <div className="mt-4 h-px bg-tab-ink/15" />
                    <ol className="mt-4 min-h-0 flex-1 space-y-1 overflow-y-auto">
                      {pages.map((page, i) => (
                        <li key={page.id}>
                          <button
                            type="button"
                            onClick={() => nav(i)}
                            disabled={viewer !== "viewing"}
                            className={`group flex w-full items-baseline gap-3 rounded-sm px-2 py-1.5 text-left transition-colors ${
                              i === current ? "bg-tab-ink/8" : "hover:bg-tab-ink/5"
                            }`}
                          >
                            <span
                              className="w-0.5 self-stretch rounded-full"
                              style={{
                                background: i === current ? "var(--report-accent)" : "transparent",
                              }}
                            />
                            <span className="font-sans text-[9px] text-tab-ink/50">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`font-sans text-[10px] tracking-[0.14em] ${
                                i === current ? "text-tab-ink" : "text-tab-ink/65"
                              }`}
                            >
                              {page.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 font-sans text-[8px] tracking-[0.2em] text-tab-ink/45">
                      {t.file}: {report.fileLabel} · {String(total).padStart(2, "0")} {t.pages}
                    </p>
                  </div>
                  {/* Shade the page while the cover hangs over it */}
                </div>

                {/* Cover-cast shade on the page (fades as the cover opens) */}
                <div
                  ref={coverShadeRef}
                  className="pointer-events-none absolute inset-0 z-20 rounded-md bg-linear-to-r from-black/25 via-black/10 to-black/5"
                />

                {/* Close — appears once the folder is fully open */}
                <button
                  type="button"
                  onClick={() => closeProject()}
                  aria-label={t.closeProject}
                  className={`absolute -top-[3%] -right-[3%] z-40 grid size-9 place-items-center rounded-full border border-line bg-paper text-lg leading-none text-ink-soft shadow-md transition-[opacity,color] hover:text-ink ${
                    viewer === "viewing" ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** One printed sheet — header, rule, blocks; identity colors via CSS vars. */
function PageFace({
  report,
  index,
  total,
}: {
  report: ProjectReport;
  index: number;
  total: number;
}) {
  const page = report.pages[Math.min(index, report.pages.length - 1)];
  return (
    <div className="relative flex h-full flex-col bg-(--report-bg) text-(--report-ink)">
      {/* Punched holes under the fastener */}
      <div aria-hidden className="pointer-events-none absolute top-[1%] left-1/2 flex w-[18%] -translate-x-1/2 justify-between">
        <span className="size-[7px] rounded-full bg-black/25 shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
        <span className="size-[7px] rounded-full bg-black/25 shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
      </div>
      <header className="flex items-baseline justify-between gap-4 px-[7%] pt-[6.5%]">
        <p className="font-sans text-[10px] tracking-[0.22em] text-(--report-accent-bright)">
          {page.label}
        </p>
        <p className="font-sans text-[9px] tracking-[0.18em] text-(--report-ink-soft)">
          {String(index + 1).padStart(2, "0")} · {String(total).padStart(2, "0")}
        </p>
      </header>
      <div className="mx-[7%] mt-[3.5%] h-px shrink-0 bg-(--report-rule)" />
      <div className="min-h-0 flex-1 overflow-y-auto px-[7%] py-[5.5%]">
        <ReportPage page={page} />
      </div>
    </div>
  );
}
