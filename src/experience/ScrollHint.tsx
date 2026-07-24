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
const RAIL_H = 52;
const SEG_H = 16;

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
      className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2.5 opacity-0"
    >
      {/*
       * Louder than it was. The first version whispered — a 10px word at
       * 45% ink — and a real visitor read the page, clicked Contact, and
       * concluded that the Contact button opens the drawer. The word is
       * now full ink at readable size, and it says what the scroll DOES,
       * because "SCROLL" alone answers the wrong question: people who miss
       * it are not failing to see an instruction, they are failing to
       * believe there is anything below.
       */}
      <span className="font-sans text-[13px] font-semibold tracking-[0.34em] text-ink sm:text-[14px]">
        {t.scroll}
      </span>
      <span className="-mt-1.5 font-sans text-[11px] tracking-[0.06em] text-ink-soft">
        {t.scrollHelp}
      </span>
      {/* The rail: a faint track the lit segment runs down. */}
      <span
        className="relative block w-px overflow-hidden bg-ink/12"
        style={{ height: RAIL_H }}
      >
        <span
          ref={segRef}
          className="absolute inset-x-0 top-0 block bg-ink/70"
          style={{ height: SEG_H }}
        />
      </span>
      <span
        ref={chevRef}
        className="block size-[7px] rotate-45 border-r border-b border-ink/70"
      />
    </div>
  );
}
