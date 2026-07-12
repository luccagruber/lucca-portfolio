"use client";

import { useLayoutEffect } from "react";

/**
 * Hard-locks page scrolling while the project viewer is open (vision:
 * scrolling is disabled while viewing; navigation is clicks only).
 * Compensates for the disappearing scrollbar so the page doesn't shift.
 */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prevOverflow = html.style.overflow;
    const prevPadding = html.style.paddingRight;
    html.style.overflow = "hidden";
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPadding;
    };
  }, [locked]);
}
