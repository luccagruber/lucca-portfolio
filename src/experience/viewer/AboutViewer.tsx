"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile } from "@/content/profile";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { FRAME } from "@/experience/scene/layout";

/**
 * The About viewer: the picture frame itself, now DOM. The 3D frame flies
 * to the camera and hands off its exact screen quad; the DOM frame mounts
 * over it pixel-for-pixel and then the photograph turns over on a real
 * vertical hinge — because the back of a print is where you write who you
 * are and hand it to someone.
 *
 * Same principle as the project folder (3D delivers, DOM reads): the text
 * is never painted onto a 3D surface, so it stays crisp and selectable.
 * The back of the frame grows past the print's own size while it turns —
 * a photo you are handed comes closer than one on a desk.
 */
export function AboutViewer() {
  const about = useExperience((s) => s.about);
  if (about === "closed") return null;
  return <FrameDialog />;
}

/** Portrait aspect of the print, straight from the 3D frame. */
const ASPECT = FRAME.width / FRAME.height;

function FrameDialog() {
  const about = useExperience((s) => s.about);
  const closeAbout = useExperience((s) => s.closeAbout);
  const webglFallback = useExperience((s) => s.webglFallback);

  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Capture focus for the dialog's lifetime; give it back on close.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    frameRef.current?.focus({ preventScroll: true });
    return () => restoreFocusRef.current?.focus?.();
  }, []);

  // Escape closes; Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useExperience.getState().closeAbout();
        return;
      }
      if (e.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Where the frame sits when it is still the 3D one: the hand-off quad. */
  const handOffPose = () => {
    const frame = frameRef.current;
    const apex = useExperience.getState().aboutApex;
    if (!frame || !apex) return { dx: 0, dy: 0, scale: 0.94 };
    return {
      dx: ((apex.x - 50) / 100) * window.innerWidth,
      dy: ((apex.y - 50) / 100) * window.innerHeight,
      scale: ((apex.h / 100) * window.innerHeight) / Math.max(frame.offsetHeight, 1),
    };
  };

  // Phase-driven enter/exit. Completions feed the machine.
  useGSAP(
    () => {
      const layer = layerRef.current;
      const mover = moverRef.current;
      const flipper = flipperRef.current;
      const chrome = chromeRef.current;
      if (!layer || !mover || !flipper || !chrome) return;
      const d = (x: number) => (prefersReducedMotion() ? 0 : x);

      if (about === "frame-lifting") {
        // The 3D frame is still flying; nothing DOM is visible yet.
        gsap.set(layer, { autoAlpha: 0 });
      } else if (about === "opening") {
        const { dx, dy, scale } = handOffPose();
        const tl = gsap.timeline({
          onComplete: () => useExperience.getState().aboutOpened(),
        });
        tl.set(layer, { autoAlpha: 1 })
          .set(chrome, { autoAlpha: 0 })
          .fromTo(
            mover,
            { x: dx, y: dy, scale },
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: d(DUR.viewerGrow),
              ease: EASE.enter,
              overwrite: "auto",
            },
            0,
          )
          .fromTo(
            flipper,
            { rotationY: 0 },
            { rotationY: 180, duration: d(DUR.frameTurn), ease: "power2.inOut", overwrite: "auto" },
            d(0.1),
          )
          .fromTo(
            chrome,
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: d(0.3), ease: EASE.enter },
            d(0.1 + DUR.frameTurn * 0.7),
          );
      } else if (about === "closing") {
        const { dx, dy, scale } = handOffPose();
        const tl = gsap.timeline({
          onComplete: () => useExperience.getState().aboutDismissed(),
        });
        tl.to(chrome, { autoAlpha: 0, y: 6, duration: d(0.14), ease: EASE.exit, overwrite: "auto" }, 0)
          .to(
            flipper,
            { rotationY: 0, duration: d(DUR.frameTurn), ease: "power2.inOut", overwrite: "auto" },
            0,
          )
          .to(
            mover,
            { x: dx, y: dy, scale, duration: d(DUR.viewerShrink), ease: EASE.exit, overwrite: "auto" },
            d(DUR.frameTurn * 0.55),
          )
          .to(layer, { autoAlpha: 0, duration: d(0.1), overwrite: "auto" }, ">-0.02");
      }
      // "viewing": steady state. "frame-returning": the layer is already
      // hidden; the 3D frame carries the moment home.
    },
    { dependencies: [about] },
  );

  const [lede, ...rest] = profile.about;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="About Lucca Gruber Rodrigues"
      className="fixed inset-0 z-50"
    >
      {/* Click-out — the veil behind already dims the workspace */}
      <div
        ref={layerRef}
        className={`absolute inset-0 opacity-0 ${
          webglFallback ? "bg-stage/60 backdrop-blur-md" : ""
        }`}
        onClick={() => closeAbout()}
      >
        <div className="absolute inset-0 grid place-items-center overflow-hidden [perspective:1600px]">
          <div ref={moverRef} className="will-change-transform">
            <div
              ref={frameRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              className="relative h-(--fh) outline-none [--fh:min(34rem,76svh)] [perspective:1600px]"
              style={{ width: `calc(var(--fh) * ${ASPECT})` }}
            >
              <div
                ref={flipperRef}
                className="relative size-full [transform-style:preserve-3d] will-change-transform"
              >
                {/* ——— Front: the framed print, as it stands on the desk ——— */}
                <div className="absolute inset-0 rounded-[4px] bg-[#26262A] p-[4%] shadow-[0_50px_100px_-24px_rgba(28,22,10,0.6)] [backface-visibility:hidden]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/portrait.jpg"
                    alt=""
                    className="size-full rounded-[1px] object-cover"
                  />
                </div>

                {/* ——— Back: where you write who you are ——— */}
                <div className="absolute inset-0 rotate-y-180 rounded-[4px] bg-[#26262A] p-[4%] shadow-[0_50px_100px_-24px_rgba(28,22,10,0.6)] [backface-visibility:hidden]">
                  <div className="flex size-full flex-col overflow-y-auto rounded-[1px] bg-photo-back px-[9%] py-[8%] text-left">
                    <p className="font-sans text-[10px] tracking-[0.24em] text-tab-ink/50">
                      ABOUT
                    </p>
                    {/* The lede breaks where profile.ts writes the break,
                        never where the column runs out. */}
                    <p className="mt-5 font-serif text-[clamp(1rem,2.4svh,1.35rem)] leading-snug whitespace-pre-line text-tab-ink">
                      {lede}
                    </p>
                    <div className="mt-5 h-px shrink-0 bg-tab-ink/15" />
                    <div className="mt-5 space-y-4">
                      {rest.map((paragraph, i) => (
                        <p
                          key={i}
                          className="font-serif text-[clamp(0.82rem,1.75svh,1rem)] leading-relaxed text-tab-ink/80"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/*
               * Close — appears once the print is turned over. The
               * wrapper carries the position, not the button: GSAP puts a
               * transform on this element, and a transform makes it the
               * containing block for anything absolute inside it.
               */}
              <div ref={chromeRef} className="absolute -top-4 -right-4 z-40 opacity-0">
                <button
                  type="button"
                  onClick={() => closeAbout()}
                  aria-label="Close about"
                  className={`grid size-9 place-items-center rounded-full border border-line bg-paper text-lg leading-none text-ink-soft shadow-md transition-colors hover:text-ink ${
                    about === "viewing" ? "" : "pointer-events-none"
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
