/**
 * Read the user's reduced-motion preference at animation time (client only).
 * Every event-driven sequence checks this and renders its end state
 * instantly instead of animating.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
