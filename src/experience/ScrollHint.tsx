"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR } from "./motion";
import { useExperience } from "./state/store";

/**
 * The only instruction the scene ever gives: a quiet pulse at the bottom
 * of the idle stage. It appears once the desk is composed and leaves for
 * good the moment the drawer starts moving.
 */
export function ScrollHint() {
  const drawer = useExperience((s) => s.drawer);
  const viewer = useExperience((s) => s.viewer);
  const sceneReady = useExperience((s) => s.sceneReady);
  const visible = sceneReady && drawer === "closed" && viewer === "closed";

  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

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
      const line = lineRef.current;
      if (!line || !visible || prefersReducedMotion()) return;
      const tl = gsap
        .timeline({ repeat: -1, repeatDelay: 0.7 })
        .fromTo(
          line,
          { scaleY: 0, transformOrigin: "50% 0%" },
          { scaleY: 1, duration: 0.7, ease: "power2.inOut" },
        )
        .to(line, { scaleY: 0, transformOrigin: "50% 100%", duration: 0.7, ease: "power2.inOut" }, ">0.15");
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
      <span ref={lineRef} className="block h-8 w-px bg-ink/50" />
      <span className="font-mono text-[10px] tracking-[0.32em] text-ink-soft">SCROLL</span>
    </div>
  );
}
