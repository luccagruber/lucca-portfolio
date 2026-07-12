"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { reportById } from "@/content/projects";
import type { ProjectReport } from "@/content/types";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { ReportPage } from "./ReportPage";

/**
 * The project viewer: a corporate report that unfolds page by page.
 * Navigation is clicks only; page scroll is locked while it is open
 * (see Experience). It owns the "opening"/"closing" viewer phases; the
 * folder lift/return phases belong to the folder system in the scene.
 *
 * The report itself is DOM, not 3D — crisp typography, real text for
 * screen readers, native focus handling. The workspace stays visible
 * behind a soft dim as context.
 */
export function ProjectViewer() {
  const viewer = useExperience((s) => s.viewer);
  const activeProject = useExperience((s) => s.activeProject);
  if (viewer === "closed" || !activeProject) return null;
  return <ViewerDialog report={reportById(activeProject)} />;
}

function ViewerDialog({ report }: { report: ProjectReport }) {
  const viewer = useExperience((s) => s.viewer);
  const page = useExperience((s) => s.page);
  const apex = useExperience((s) => s.apex);
  const goToPage = useExperience((s) => s.goToPage);
  const closeProject = useExperience((s) => s.closeProject);

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const lastPageRef = useRef(0);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const pages = report.pages;
  const current = Math.min(page, pages.length - 1);
  const atFirst = current === 0;
  const atLast = current === pages.length - 1;

  const identityVars = {
    "--report-bg": report.identity.background,
    "--report-ink": report.identity.ink,
    "--report-ink-soft": report.identity.inkSoft,
    "--report-accent": report.identity.accent,
    "--report-accent-bright": report.identity.accentBright,
    "--report-rule": report.identity.rule,
  } as CSSProperties;

  // Capture focus for the dialog's lifetime; give it back on close.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus({ preventScroll: true });
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
      if (s.viewer !== "viewing") return;
      if (e.key === "ArrowRight") s.goToPage(Math.min(s.page + 1, pages.length - 1));
      if (e.key === "ArrowLeft") s.goToPage(Math.max(s.page - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  // Phase-driven enter/exit. Completions feed the machine.
  useGSAP(
    () => {
      const backdrop = backdropRef.current;
      const layer = layerRef.current;
      if (!backdrop || !layer) return;
      const d = (x: number) => (prefersReducedMotion() ? 0 : x);

      if (viewer === "folder-lifting") {
        gsap.set(layer, { autoAlpha: 0 });
        gsap.to(backdrop, { autoAlpha: 1, duration: d(DUR.backdropIn), ease: "power2.out" });
      } else if (viewer === "opening") {
        gsap.to(backdrop, { autoAlpha: 1, duration: d(0.2), overwrite: "auto" });
        gsap.set(layer, {
          transformOrigin: apex ? `${apex.x}% ${apex.y}%` : "50% 62%",
        });
        gsap.fromTo(
          layer,
          { autoAlpha: 0, y: 26, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: d(DUR.viewerIn),
            ease: EASE.enter,
            onComplete: () => useExperience.getState().viewerOpened(),
          },
        );
      } else if (viewer === "closing") {
        gsap.to(layer, {
          autoAlpha: 0,
          y: 16,
          scale: 0.965,
          duration: d(DUR.viewerOut),
          ease: EASE.exit,
          overwrite: "auto",
          onComplete: () => useExperience.getState().viewerDismissed(),
        });
      } else if (viewer === "folder-returning") {
        gsap.to(backdrop, { autoAlpha: 0, duration: d(DUR.backdropOut), ease: "power2.in" });
      }
    },
    { dependencies: [viewer] },
  );

  // Direction-aware page turn.
  useGSAP(
    () => {
      const el = pageContentRef.current;
      if (!el) return;
      const dir = current >= lastPageRef.current ? 1 : -1;
      lastPageRef.current = current;
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, x: 22 * dir },
        { autoAlpha: 1, x: 0, duration: DUR.pageTurn, ease: EASE.settle },
      );
    },
    { dependencies: [current] },
  );

  const navButton =
    "font-mono text-[11px] tracking-[0.18em] text-(--report-ink-soft) transition-colors hover:text-(--report-ink) disabled:pointer-events-none disabled:opacity-35";

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Project file: ${report.name}`}
      style={identityVars}
      className="fixed inset-0 z-50"
    >
      {/* Soft dim — the workspace remains as contextual background */}
      <div
        ref={backdropRef}
        onClick={() => closeProject()}
        className="absolute inset-0 bg-stage/60 opacity-0 backdrop-blur-md"
        aria-hidden
      />

      {/* Transform layer — scales in from the lifted folder's screen point */}
      <div
        ref={layerRef}
        className="pointer-events-none absolute inset-0 grid place-items-center p-3 opacity-0 sm:p-6"
      >
        <article
          ref={sheetRef}
          tabIndex={-1}
          className="pointer-events-auto relative flex h-[min(84svh,54rem)] w-[min(46rem,94vw)] flex-col rounded-lg bg-(--report-bg) text-(--report-ink) shadow-[0_40px_80px_-24px_rgba(20,18,12,0.5)] ring-1 ring-black/10 outline-none"
        >
          {/* The physical file peeking behind the report */}
          <div
            aria-hidden
            className="absolute -inset-x-2 -bottom-2.5 top-4 -z-10 rotate-[-0.5deg] rounded-lg bg-manila shadow-2xl"
          />
          <div
            aria-hidden
            className="absolute -top-7 left-7 -z-10 flex h-9 w-52 items-start justify-center rounded-t-md bg-manila pt-1.5"
          >
            <span className="font-mono text-[11px] tracking-[0.18em] text-tab-ink">
              {report.fileLabel}
            </span>
          </div>

          <header className="flex items-center justify-between gap-4 px-6 pt-5 sm:px-10 sm:pt-7">
            <p className="font-mono text-[11px] tracking-[0.24em] text-(--report-accent-bright)">
              {pages[current].label}
            </p>
            {/* Subtle close — available once the folder has fully opened */}
            <button
              type="button"
              onClick={() => closeProject()}
              aria-label="Close project file"
              className={`grid size-8 place-items-center rounded-full border border-(--report-rule) text-lg leading-none text-(--report-ink-soft) transition-[opacity,color] hover:text-(--report-ink) ${
                viewer === "viewing" ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              ×
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
            <div ref={pageContentRef} key={current}>
              <ReportPage page={pages[current]} />
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-(--report-rule) px-6 py-4 sm:px-10">
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-(--report-ink-soft) sm:block">
              FILE: {report.fileLabel}
            </span>
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
              <button
                type="button"
                className={navButton}
                disabled={atFirst || viewer !== "viewing"}
                onClick={() => goToPage(current - 1)}
              >
                ← PREV
              </button>
              <span className="font-mono text-[10px] tracking-[0.2em] text-(--report-ink-soft)">
                PAGE {String(current + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className={navButton}
                disabled={atLast || viewer !== "viewing"}
                onClick={() => goToPage(current + 1)}
              >
                NEXT →
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
