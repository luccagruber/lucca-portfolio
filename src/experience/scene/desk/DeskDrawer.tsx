"use client";

import { useCallback, useMemo, useRef } from "react";
import { createPortal, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Group, Object3D } from "three";
import type { ProjectId } from "@/content/types";
import { projectReports } from "@/content/projects";
import { DRAWER_BUMP, DUR, EASE, SEQ } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { DESK, FOLDER_POSE } from "../layout";
import { ProjectFolders } from "../folders/ProjectFolders";

/**
 * The drawer system: opening, closing, and revealing the folders — those
 * three motions and nothing else (architecture rule). It animates the
 * GLB's drawer node in place (the node slides along +z in its own space)
 * and portals the folder anchors into that node so they travel with it.
 * The reveal (rise out of the box, tip upright) is animated here because
 * revealing belongs to the drawer; each folder owns only its own body.
 *
 * Its timeline is the authority for the drawer machine: completions call
 * `drawerOpened` / `drawerClosed`.
 */
export function DeskDrawer({ node }: { node: Object3D }) {
  const anchors = useRef(new Map<ProjectId, Group>());
  const invalidate = useThree((s) => s.invalidate);
  const phase = useExperience((s) => s.drawer);
  /** The drawer's resting z, measured off the untouched node at mount. */
  const closedZ = useMemo(() => node.position.z, [node]);

  const registerAnchor = useCallback((id: ProjectId, el: Group | null) => {
    if (el) anchors.current.set(id, el);
    else anchors.current.delete(id);
  }, []);

  useGSAP(
    () => {
      const files = projectReports
        .map((r) => anchors.current.get(r.id))
        .filter((g): g is Group => Boolean(g));
      if (files.length !== projectReports.length) return;
      const openZ = closedZ + DESK.drawer.travel;

      if (phase === "opening") {
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().drawerOpened(),
        });
        // Heavy steel box on rails: long glide, then a bumper kiss back.
        tl.to(node.position, {
          z: openZ + DRAWER_BUMP,
          duration: DUR.drawerSlide,
          ease: EASE.heavy,
        }).to(node.position, {
          z: openZ,
          duration: DUR.drawerSettle,
          ease: "power1.out",
        });
        // Folders rise while the drawer finishes its slide — staggered,
        // tipping upright a beat after they start to lift.
        files.forEach((anchor, i) => {
          const at = SEQ.folderRiseAt + i * SEQ.folderStagger;
          tl.to(
            anchor.position,
            { y: FOLDER_POSE.revealed.y, duration: DUR.folderRise, ease: EASE.settle },
            at,
          ).to(
            anchor.rotation,
            { x: FOLDER_POSE.revealed.rotX, duration: DUR.folderRise + 0.12, ease: EASE.settle },
            at + 0.05,
          );
        });
        if (useExperience.getState().instant) tl.progress(1);
      } else if (phase === "closing") {
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().drawerClosed(),
        });
        files.forEach((anchor, i) => {
          const at = i * 0.08;
          tl.to(
            anchor.rotation,
            { x: FOLDER_POSE.hidden.rotX, duration: DUR.folderSink, ease: EASE.exit },
            at,
          ).to(
            anchor.position,
            { y: FOLDER_POSE.hidden.y, duration: DUR.folderSink, ease: EASE.exit },
            at + 0.03,
          );
        });
        tl.to(
          node.position,
          { z: closedZ, duration: DUR.drawerReturn, ease: EASE.heavy },
          DUR.folderSink - 0.18,
        );
        if (useExperience.getState().instant) tl.progress(1);
      } else {
        // Idempotent snap for static phases (mount, restored state).
        const open = phase === "open";
        gsap.set(node.position, { z: open ? openZ : closedZ });
        const pose = open ? FOLDER_POSE.revealed : FOLDER_POSE.hidden;
        for (const anchor of files) {
          gsap.set(anchor.position, { y: pose.y });
          gsap.set(anchor.rotation, { x: pose.rotX });
        }
        invalidate();
      }
    },
    { dependencies: [phase, invalidate, closedZ] },
  );

  // Folder anchors live inside the drawer node so they travel with it.
  return createPortal(<ProjectFolders registerAnchor={registerAnchor} />, node);
}
