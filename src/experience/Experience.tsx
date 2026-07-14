"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projectReports } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, SCROLL } from "./motion";
import { useScrollDirector } from "./hooks/useScrollDirector";
import { useScrollLock } from "./hooks/useScrollLock";
import { useExperience } from "./state/store";
import { ExperienceCanvas } from "./ExperienceCanvas";
import { ExperienceA11y } from "./ExperienceA11y";
import { ScrollHint } from "./ScrollHint";
import { ProjectViewer } from "./viewer/ProjectViewer";
import { WebglFallbackWorkspace } from "./WebglFallbackWorkspace";

gsap.registerPlugin(useGSAP);

const VEIL_ON = "blur(14px) brightness(0.85) saturate(0.92)";
const VEIL_OFF = "blur(0px) brightness(1) saturate(1)";

/**
 * The immersive act. The stage is sticky for `stageHeightSvh` of document
 * height: the arrival scroll triggers the drawer sequence (an event, not a
 * scrub), the open scene holds while folders are explored, and then the
 * workspace simply scrolls away into the traditional portfolio below.
 *
 * This component also owns the veil: while a project file is open the
 * whole stage softly blurs and dims behind it — a treatment of the stage,
 * not of any one system inside it.
 */
export function Experience() {
  useScrollDirector();
  const viewer = useExperience((s) => s.viewer);
  const webglFallback = useExperience((s) => s.webglFallback);
  useScrollLock(viewer !== "closed");

  const veilRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const veil = veilRef.current;
      const dim = dimRef.current;
      if (!veil || !dim || webglFallback) return;
      const duration = prefersReducedMotion() ? 0 : undefined;

      if (viewer === "opening") {
        gsap.to(veil, {
          filter: VEIL_ON,
          // Slight scale hides the transparent edge a blur pulls in.
          scale: 1.03,
          duration: duration ?? DUR.veilIn,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dim, {
          autoAlpha: 1,
          duration: duration ?? DUR.veilIn,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (viewer === "folder-returning" || viewer === "closed") {
        gsap.to(veil, {
          filter: VEIL_OFF,
          scale: 1,
          duration: duration ?? DUR.veilOut,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(dim, {
          autoAlpha: 0,
          duration: duration ?? DUR.veilOut,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }
    },
    { dependencies: [viewer, webglFallback] },
  );

  return (
    <section
      aria-label="Workspace — the project files"
      className={webglFallback ? "relative bg-stage py-6 sm:py-12" : "relative"}
      style={webglFallback ? undefined : { height: `${SCROLL.stageHeightSvh}svh` }}
    >
      {webglFallback ? (
        <WebglFallbackWorkspace />
      ) : (
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          <div ref={veilRef} className="absolute inset-0" style={{ filter: VEIL_OFF }}>
            <ExperienceCanvas />
          </div>
          <div
            ref={dimRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-stage/45 opacity-0"
          />
          <ScrollHint />
          <ExperienceA11y />
          <noscript>
            <NoScriptProjects />
          </noscript>
        </div>
      )}
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
