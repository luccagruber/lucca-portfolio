"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { SCROLL } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";

/**
 * Scroll is a *trigger*, never a scrubber (architecture rule). This hook
 * watches window scroll and dispatches exactly two events with hysteresis:
 *
 * - past `openTriggerPx` while the drawer is closed → open the drawer
 * - back at the very top while the drawer is open   → close it (reverse
 *   animation plays once)
 *
 * It also re-evaluates when transitions settle, so reaching the top while
 * the drawer is still opening closes it as soon as the machine allows.
 */
export function useScrollDirector() {
  useEffect(() => {
    let raf = 0;
    // The reverse plays only when the user *returns* to the top after
    // having scrolled — not when the drawer was opened another way (e.g.
    // clicking the cabinet) while the page is still at the top.
    let armedClose = false;

    const evaluate = (instant = false) => {
      const s = useExperience.getState();
      if (s.viewer !== "closed") return; // the viewer owns input while open
      const immediate = instant || prefersReducedMotion();
      const y = window.scrollY;
      if (y >= SCROLL.openTriggerPx) armedClose = true;
      if (y >= SCROLL.openTriggerPx && s.drawer === "closed") {
        s.openDrawer({ instant: immediate });
      } else if (y <= SCROLL.closeTriggerPx && s.drawer === "open" && armedClose) {
        armedClose = false;
        s.closeDrawer({ instant: immediate });
      }
    };

    // Arriving mid-page (browser scroll restoration, #anchors): restore the
    // matching state without playing the sequence.
    evaluate(true);

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        evaluate();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const unsubDrawer = useExperience.subscribe(
      (s) => s.drawer,
      () => evaluate(),
    );
    const unsubViewer = useExperience.subscribe(
      (s) => s.viewer,
      () => evaluate(),
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      unsubDrawer();
      unsubViewer();
    };
  }, []);
}
