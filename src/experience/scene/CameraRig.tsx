"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Vector3 } from "three";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE, SEQ } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { CAMERA, FRAMINGS, type FramingName } from "./layout";

/**
 * The camera system: framing, subtle easing, focus transitions — and
 * nothing else (architecture rule). It reacts to experience state but
 * never drives it; no completion here gates any transition.
 */

function framingFor(name: FramingName, aspect: number) {
  const f = FRAMINGS[name];
  const target = new Vector3(...f.target);
  const position = new Vector3(...f.position);
  const boost = CAMERA.portraitDistanceBoost(aspect);
  if (boost > 1) {
    // Pull back on the horizontal plane only — scaling the vertical offset
    // too would steepen the down-angle and sink the composition on
    // portrait screens.
    position.sub(target);
    position.x *= boost;
    position.z *= boost;
    position.add(target);
  }
  return { position, target };
}

export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);

  const drawer = useExperience((s) => s.drawer);
  const viewer = useExperience((s) => s.viewer);

  const rig = useRef({
    pos: new Vector3(),
    target: new Vector3(),
    par: { x: 0, y: 0, tx: 0, ty: 0 },
    framing: null as FramingName | null,
  });

  const framing: FramingName =
    viewer !== "closed" && viewer !== "folder-returning"
      ? "project"
      : drawer === "opening" || drawer === "open"
        ? "cabinet"
        : "overview";

  // Ease to the framing for the current state; snap on first mount,
  // restore, and reduced motion. Layout effect so the very first paint is
  // already composed for the actual viewport.
  useLayoutEffect(() => {
    const r = rig.current;
    const aspect = size.width / Math.max(size.height, 1);
    const { position, target } = framingFor(framing, aspect);
    const isFirst = r.framing === null;
    const isReframe = r.framing === framing; // same shot, new viewport
    r.framing = framing;

    if (isFirst || prefersReducedMotion() || useExperience.getState().instant) {
      gsap.killTweensOf([r.pos, r.target]);
      r.pos.copy(position);
      r.target.copy(target);
      invalidate();
      return;
    }

    const duration = isReframe ? DUR.cameraReframe : DUR.cameraFraming;
    const delay =
      !isReframe && framing === "cabinet" && drawer === "opening"
        ? SEQ.cameraDelayIn
        : 0;
    const vars = { duration, delay, ease: EASE.glide, overwrite: "auto" as const, onUpdate: invalidate };
    gsap.to(r.pos, { x: position.x, y: position.y, z: position.z, ...vars });
    gsap.to(r.target, { x: target.x, y: target.y, z: target.z, ...vars });
  }, [framing, drawer, size.width, size.height, invalidate]);

  // Barely-there pointer parallax — fine pointers only, never with
  // reduced motion. Purely additive on top of the framing.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rig.current.par.tx = nx * CAMERA.parallax.x;
      rig.current.par.ty = -ny * CAMERA.parallax.y;
      invalidate();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [invalidate]);

  useFrame((_, delta) => {
    const r = rig.current;
    const k = 1 - Math.exp(-6 * Math.min(delta, 0.1));
    r.par.x += (r.par.tx - r.par.x) * k;
    r.par.y += (r.par.ty - r.par.y) * k;
    camera.position.set(r.pos.x + r.par.x, r.pos.y + r.par.y, r.pos.z);
    camera.lookAt(r.target);
    // Keep rendering until the parallax damping has converged.
    if (
      Math.abs(r.par.tx - r.par.x) > 4e-4 ||
      Math.abs(r.par.ty - r.par.y) > 4e-4
    ) {
      invalidate();
    }
  });

  return null;
}
