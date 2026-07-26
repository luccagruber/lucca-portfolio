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
 * The only instruction the scene ever gives. It appears once the desk is
 * composed and leaves for good the moment the drawer starts moving.
 *
 * It is words on a small dark plate, and nothing else. There was a rail
 * with a lit segment travelling down it and a chevron taking the hand-off
 * below — the argument being that something has to physically move
 * *downward* for a hint to mean "down". In practice it read as a gadget
 * bolted under the sentence, and the sentence already says what to do
 * (user, 2026-07-26). Removing it also removed the experience's only
 * permanently looping animation, so the renderer now truly idles while
 * the scene is still.
 *
 * The plate is carried at every size. It began as a phone fix — the close
 * shot puts the mark on bare mid-tone wood, where light ink with a soft
 * halo is illegible — but it reads better on the wide shot too, so both
 * get it. The one piece of UI in the scene admits it is UI, which is the
 * same licence the click hotspot already takes.
 */
export function ScrollHint() {
  const t = ui[useLocale()];
  const drawer = useExperience((s) => s.drawer);
  const viewer = useExperience((s) => s.viewer);
  const about = useExperience((s) => s.about);
  const sceneReady = useExperience((s) => s.sceneReady);
  const visible = sceneReady && drawer === "closed" && viewer === "closed" && about === "closed";

  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={rootRef}
      aria-hidden
      /*
       * Anchored from the TOP as a percentage, not from the bottom in
       * pixels: the camera is static and the canvas is one viewport tall,
       * so the mark always lands on the same band of the stage, while a
       * fixed bottom offset drifts as the window changes height.
       *
       * Low on the stage in both shapes (user, 2026-07-26).
       */
      className="pointer-events-none absolute inset-x-0 top-[84%] z-10 flex justify-center opacity-0 sm:top-[86%]"
    >
      {/*
       * The plate carries its own light hairline. On a phone it lands on
       * wood and a dark plate alone is plenty; on the wide shot it lands
       * across the desk's cast shadow, where dark-on-dark left it hard to
       * pick out and the blur had no texture to work with. The ring gives
       * it an edge against ANY background rather than tuning the position
       * against where a shadow happens to fall, which changes with the
       * window's shape anyway.
       */}
      <span className="flex flex-col items-center gap-1 rounded-full bg-[rgba(24,18,8,0.62)] px-6 py-3 ring-1 ring-paper/20 shadow-[0_10px_30px_-12px_rgba(28,22,10,0.75)] backdrop-blur-[3px]">
        <span className="font-sans text-[13px] font-semibold tracking-[0.34em] text-paper sm:text-[14px]">
          {t.scroll}
        </span>
        <span className="font-sans text-[11px] tracking-[0.06em] text-paper/85">
          {t.scrollHelp}
        </span>
      </span>
    </div>
  );
}
