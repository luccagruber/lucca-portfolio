"use client";

import { projectReports } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { useExperience } from "@/experience/state/store";

const srButton =
  "sr-only focus:not-sr-only focus:rounded-full focus:border focus:border-line focus:bg-paper focus:px-5 focus:py-2.5 focus:text-sm focus:text-ink focus:shadow-lg";

/**
 * Keyboard and screen-reader path through the canvas-only interactions.
 * The buttons dispatch the same machine events as the 3D scene; they
 * become visible when focused.
 */
export function ExperienceA11y() {
  const drawer = useExperience((s) => s.drawer);
  const viewer = useExperience((s) => s.viewer);
  const openDrawer = useExperience((s) => s.openDrawer);
  const selectProject = useExperience((s) => s.selectProject);

  const announcement =
    viewer !== "closed"
      ? ""
      : drawer === "open"
        ? "Projects drawer open. Two project files available."
        : "";

  return (
    <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-3">
      {drawer === "closed" && viewer === "closed" ? (
        <button
          type="button"
          className={srButton}
          onClick={() => openDrawer({ instant: prefersReducedMotion() })}
        >
          Open the projects drawer
        </button>
      ) : null}
      {drawer === "open" && viewer === "closed"
        ? projectReports.map((report) => (
            <button
              key={report.id}
              type="button"
              className={srButton}
              onClick={() => selectProject(report.id)}
            >
              Open project file: {report.name}
            </button>
          ))
        : null}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
