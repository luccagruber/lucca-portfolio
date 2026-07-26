"use client";

import { useLayoutEffect } from "react";

/**
 * Where the document really is while it is pinned.
 *
 * Pinning the body at `position: fixed` makes `window.scrollY` report 0,
 * because the document genuinely is at the top — the page is being held
 * up by a negative offset instead. Anything that reads the scroll to make
 * a decision has to read THIS instead, or it will conclude the visitor
 * jumped to the top the moment a folder opens. (That is not theoretical:
 * the scroll director closed the drawer under an open report, then
 * reopened it when the page came back, and the two re-locked each other.)
 */
let lockedScrollY: number | null = null;

/** The document's logical scroll position, pinned or not. */
export function pageScrollY(): number {
  return lockedScrollY ?? window.scrollY;
}

/**
 * Hard-locks page scrolling while a project file or the About print is
 * open (vision: scrolling is disabled while viewing; navigation is clicks
 * only), and while the drawer sequence plays.
 *
 * `overflow: hidden` on the document is NOT enough. Every desktop browser
 * honours it; iOS Safari does not — it keeps scrolling the page anyway,
 * and a visitor trying to read a report by dragging the page ends up
 * dragging the workspace out from behind it. The fix that does work
 * everywhere is to take the document out of flow: pin the body at
 * `position: fixed` offset by the current scroll, which leaves the page
 * looking identical and gives the touch nothing to move.
 *
 * Restoring has to be instant. `html` carries `scroll-behavior: smooth`,
 * so a plain `scrollTo` on unlock would animate the page back to where it
 * already was — visible as a lurch the moment a folder closes.
 */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    // The scrollbar vanishes with the body out of flow; hold the width so
    // the page doesn't jump sideways on a pointer device.
    const gap = window.innerWidth - html.clientWidth;

    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    lockedScrollY = scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      lockedScrollY = null;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;

      const behavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = behavior;
    };
  }, [locked]);
}
