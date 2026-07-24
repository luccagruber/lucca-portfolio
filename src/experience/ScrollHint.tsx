"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR } from "./motion";
import { useExperience } from "./state/store";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale";

/**
 * The only instruction the scene ever gives: the word, a rail, and a lit
 * segment running down it, over and over. It appears once the desk is
 * composed and leaves for good the moment the drawer starts moving.
 *
 * The travelling segment replaced a hairline that drew and retracted in
 * place: that read as a flourish, not a direction. Something has to
 * actually move *downward* for the hint to mean "down". Flat marks, ink on
 * the stage — the same language as the desk's click hotspot, so the two
 * pieces of UI in the whole experience look related.
 */
const RAIL_H = 40;
const SEG_H = 14;

export function ScrollHint() {
  const t = ui[useLocale()];
  const drawer = useExperience((s) => s.drawer);
  const viewer = useExperience((s) => s.viewer);
  const about = useExperience((s) => s.about);
  const sceneReady = useExperience((s) => s.sceneReady);
  const visible = sceneReady && drawer === "closed" && viewer === "closed" && about === "closed";

  const rootRef = useRef<HTMLDivElement>(null);
  const segRef = useRef<HTMLSpanElement>(null);
  const chevRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      gsap.to(root, {
        autoAlpha: visible ? 1 : 0,
        duration: prefersReducedMotion() ? 0 : DUR.hint,
        delay: visible && !prefersReducedMotion() ? 0.8 : 0,
        ease: "power1.inOut",
        overwrite: "auto",
      });
    },
    { dependencies: [visible] },
  );

  useGSAP(
    () => {
      const seg = segRef.current;
      const chev = chevRef.current;
      if (!seg || !chev || !visible || prefersReducedMotion()) return;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.45 });
      tl.fromTo(
        seg,
        { y: -SEG_H, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.32, ease: "power1.out" },
      )
        .to(seg, { y: RAIL_H - SEG_H, duration: 0.95, ease: "power1.in" })
        .to(seg, { y: RAIL_H, opacity: 0, duration: 0.28, ease: "power1.in" }, ">-0.06")
        // The chevron takes the hand-off — the movement continues past the
        // rail instead of stopping at it.
        .fromTo(
          chev,
          { opacity: 0.25, y: -3 },
          { opacity: 1, y: 1, duration: 0.3, ease: "power2.out" },
          "<-0.12",
        )
        .to(chev, { opacity: 0.25, y: -3, duration: 0.45, ease: "power2.inOut" }, ">");
      return () => {
        tl.kill();
      };
    },
    { dependencies: [visible] },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      /*
       * Sitting IN the desk's cast shadow, not on the edge of it. The whole
       * mark — word, rail and the chevron the segment hands off to — has to
       * land inside that darker band, and everything is set in light ink
       * rather than dark. Dark marks on a dark shadow were the reason this
       * still read as faint after being made bigger.
       *
       * Anchored from the TOP as a percentage, not from the bottom in
       * pixels: the camera is static and the canvas is one viewport tall,
       * so the shadow always falls across roughly the same band of the
       * stage — 80% down — while a fixed bottom offset drifts out of it as
       * the window changes height. That drift is what left the chevron
       * hanging below the shadow before.
       *
       * The light is carried by a paper tone at partial strength rather
       * than pure white: the hint is one quiet mark in the scene, not a
       * badge stuck on top of it. A soft dark halo keeps it legible if a
       * window shape ever puts it half off the shadow.
       */
      className="pointer-events-none absolute inset-x-0 top-[81%] z-10 flex flex-col items-center gap-2.5 opacity-0 [text-shadow:0_1px_10px_rgba(28,22,10,0.35)]"
    >
      <span className="font-sans text-[13px] font-semibold tracking-[0.34em] text-paper/95 sm:text-[14px]">
        {t.scroll}
      </span>
      <span className="-mt-1.5 font-sans text-[11px] tracking-[0.06em] text-paper/70">
        {t.scrollHelp}
      </span>
      {/* The rail: a faint track the lit segment runs down. */}
      <span
        className="relative block w-px overflow-hidden bg-paper/25"
        style={{ height: RAIL_H }}
      >
        <span
          ref={segRef}
          className="absolute inset-x-0 top-0 block bg-paper/90"
          style={{ height: SEG_H }}
        />
      </span>
      <span
        ref={chevRef}
        className="block size-[7px] rotate-45 border-r border-b border-paper/90"
      />
    </div>
  );
}
