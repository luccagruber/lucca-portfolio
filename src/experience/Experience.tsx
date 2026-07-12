"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projectReports } from "@/content/projects";
import { SCROLL } from "./motion";
import { useScrollDirector } from "./hooks/useScrollDirector";
import { useScrollLock } from "./hooks/useScrollLock";
import { useExperience } from "./state/store";
import { ExperienceCanvas } from "./ExperienceCanvas";
import { ExperienceA11y } from "./ExperienceA11y";
import { ProjectViewer } from "./viewer/ProjectViewer";

gsap.registerPlugin(useGSAP);

/**
 * The immersive act. The stage is sticky for `stageHeightSvh` of document
 * height: the arrival scroll triggers the drawer sequence (event, not
 * scrub), the open scene holds while folders are explored, and then the
 * workspace simply scrolls away into the traditional portfolio below —
 * exactly the vision's transition, with no pinned scrubbing.
 */
export function Experience() {
  useScrollDirector();
  const viewer = useExperience((s) => s.viewer);
  useScrollLock(viewer !== "closed");

  return (
    <section
      aria-label="Workspace — the project files"
      className="relative"
      style={{ height: `${SCROLL.stageHeightSvh}svh` }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <ExperienceCanvas />
        <ExperienceA11y />
        <noscript>
          <NoScriptProjects />
        </noscript>
      </div>
      <ProjectViewer />
    </section>
  );
}

/** Static, readable fallback when JavaScript is unavailable. */
function NoScriptProjects() {
  return (
    <div className="absolute inset-0 overflow-auto bg-stage px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-10">
        <p className="section-label">Projects</p>
        {projectReports.map((report) => {
          const cover = report.pages[0];
          const kicker = cover.blocks.find((b) => b.kind === "kicker");
          const lede = cover.blocks.find((b) => b.kind === "lede");
          return (
            <div key={report.id}>
              <h2 className="text-2xl font-semibold tracking-tight">{report.name}</h2>
              {kicker?.kind === "kicker" ? (
                <p className="mt-1 text-sm text-ink-faint">{kicker.text}</p>
              ) : null}
              {lede?.kind === "lede" ? (
                <p className="mt-3 leading-relaxed text-ink-soft">{lede.text}</p>
              ) : null}
            </div>
          );
        })}
        <p className="text-sm text-ink-faint">
          Enable JavaScript for the interactive workspace.
        </p>
      </div>
    </div>
  );
}
