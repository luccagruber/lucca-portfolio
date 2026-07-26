"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { SCROLL } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { pageScrollY } from "./useScrollLock";

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
    let lastY = pageScrollY();

    const evaluate = (instant = false) => {
      const s = useExperience.getState();
      if (s.webglFallback) return; // scroll triggers are inactive in fallback mode
      if (s.viewer !== "closed") return; // the viewer owns input while open
      // Never `window.scrollY` — while the page is pinned behind an open
      // viewer that reads 0, and 0 means "back at the top", which would
      // close the drawer under the thing being read (see useScrollLock).
      const y = pageScrollY();
      /*
       * A jump, not a scroll: clicking Contact throws the page most of the
       * way down the document in one go. Playing the full drawer sequence
       * underneath that is what made a real visitor conclude the Contact
       * button opens the drawer — the two happened together, so she read
       * them as cause and effect. On a jump the drawer simply *is* open by
       * the time she looks, with no performance attached to the click.
       */
      const jumped = Math.abs(y - lastY) > window.innerHeight * 1.2;
      lastY = y;
      const immediate = instant || jumped || prefersReducedMotion();
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
