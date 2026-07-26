"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal, useThree } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Group, Object3D } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { ProjectId } from "@/content/types";
import { projectReports } from "@/content/projects";
import { DRAWER_BUMP, DUR, EASE, NUDGE, SEQ } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DESK, FOLDER_POSE } from "../layout";
import { ProjectFolders } from "../folders/ProjectFolders";
import { DrawerLabel } from "./DrawerLabel";

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
  /** How many nudges this visit has already spent. */
  const nudgedRef = useRef(0);
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

  /*
   * The self-teaching nudge. Only from a cold arrival: the scene is ready,
   * the drawer has never been opened, nothing else is on screen, and the
   * page is still at the top. Any scroll at all — even one that doesn't
   * reach the trigger — means the visitor has understood the gesture, so
   * the drawer stops asking.
   */
  const sceneReady = useExperience((s) => s.sceneReady);
  const viewer = useExperience((s) => s.viewer);
  const about = useExperience((s) => s.about);
  const idle = sceneReady && phase === "closed" && viewer === "closed" && about === "closed";

  /*
   * The drawer is also a handle you can simply pull — or push. Scroll
   * remains the narrated way in (the hint and the nudge both point at
   * it), but a finger's first instinct is to tap the thing itself — and
   * a drawer that shifts on its rails inviting you and then ignores your
   * tap breaks the physicality it just performed. Desktop clicks get the
   * same courtesy. The front panel toggles: closed it opens, open it
   * closes (the panel rides the box well below the standing folders, so
   * the two targets never compete). A tap-opened drawer needs this way
   * back: the scroll director only closes what scrolling opened.
   */
  const frontActive =
    sceneReady &&
    viewer === "closed" &&
    about === "closed" &&
    (phase === "closed" || phase === "open");
  const [frontHovered, setFrontHovered] = useState(false);
  useCursor(frontHovered && frontActive);
  const onFrontOver = (e: ThreeEvent<PointerEvent>) => {
    if (!frontActive) return;
    e.stopPropagation();
    setFrontHovered(true);
  };
  const onFrontOut = () => setFrontHovered(false);
  const onFrontClick = (e: ThreeEvent<MouseEvent>) => {
    if (!frontActive) return;
    e.stopPropagation();
    setFrontHovered(false);
    const s = useExperience.getState();
    if (s.drawer === "closed") s.openDrawer({ instant: prefersReducedMotion() });
    else s.closeDrawer({ instant: prefersReducedMotion() });
  };

  useGSAP(
    () => {
      if (!idle || prefersReducedMotion()) return;
      if (nudgedRef.current >= NUDGE.times) return;

      const tl = gsap.timeline({
        onUpdate: invalidate,
        delay: nudgedRef.current === 0 ? NUDGE.firstDelay : NUDGE.interval,
        repeat: NUDGE.times - 1 - nudgedRef.current,
        repeatDelay: NUDGE.interval,
        onRepeat: () => {
          nudgedRef.current += 1;
        },
        onComplete: () => {
          nudgedRef.current = NUDGE.times;
        },
      });
      tl.to(node.position, { z: closedZ + NUDGE.distance, duration: NUDGE.out, ease: "power2.out" })
        .to(node.position, { z: closedZ, duration: NUDGE.back, ease: EASE.heavy });

      // Any scroll retires it for the visit, mid-tween if need be.
      const stop = () => {
        nudgedRef.current = NUDGE.times;
        tl.kill();
        gsap.to(node.position, {
          z: closedZ,
          duration: 0.2,
          ease: "power2.out",
          onUpdate: invalidate,
        });
      };
      window.addEventListener("scroll", stop, { once: true, passive: true });

      return () => {
        window.removeEventListener("scroll", stop);
        tl.kill();
      };
    },
    /*
     * `revertOnUpdate` matters: without it useGSAP does NOT run the
     * cleanup when dependencies change (only on unmount), so a pending
     * nudge would survive `idle` flipping false — and its scheduled
     * repeat would then glide the freshly opened drawer shut while the
     * machine believes it is open. Any exit from idle must genuinely
     * retire the nudge, whichever door the visitor took.
     */
    { dependencies: [idle, invalidate, closedZ], revertOnUpdate: true },
  );

  // Folder anchors and the drawer's own name card live inside the drawer
  // node, so both travel with it.
  return createPortal(
    <>
      <ProjectFolders registerAnchor={registerAnchor} />
      <DrawerLabel />
      {/* Generous invisible pull/push-target over the drawer's front
          panel. Unmounted while anything is in flight or open above it,
          so it can never sit between the pointer and the folders. */}
      {frontActive ? (
        <mesh
          position={[0, 0.02, 0.215]}
          onPointerOver={onFrontOver}
          onPointerOut={onFrontOut}
          onClick={onFrontClick}
        >
          <boxGeometry args={[0.42, 0.26, 0.02]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ) : null}
    </>,
    node,
  );
}
