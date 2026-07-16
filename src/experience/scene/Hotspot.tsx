"use client";

import { useRef } from "react";
import { Billboard } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Group, MeshBasicMaterial } from "three";
import { palette } from "@/lib/palette";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE } from "@/experience/motion";

/**
 * The click hotspot: a flat black dot inside a thin ring, always square to
 * the camera. Unlit on purpose — `meshBasicMaterial` takes no light, so it
 * stays a printed mark rather than an object sitting in the room. It is the
 * one thing in the workspace that is not pretending to be real, and it says
 * exactly one thing: this is clickable.
 *
 * A ring pings out of the mark and fades, on a loop, because a still mark
 * is findable but not inviting. The ping stops the moment the pointer
 * arrives — it has done its job by then — and the ring closing in on the
 * dot takes over as the response.
 *
 * COST: the ping is the only continuous animation in the experience, and
 * the scene renders on demand (frameloop="demand"), so it keeps the
 * renderer awake while the mark is idle and visible. That is deliberate —
 * the invitation is worth more than the idle frames.
 *
 * Used by the picture frame alone. The folders need no mark: the drawer
 * sliding open is already the invitation.
 */
export function Hotspot({
  position,
  visible = true,
  active = false,
  size = 1,
}: {
  position: [number, number, number];
  /** Collapses when the object is not currently clickable. */
  visible?: boolean;
  /** The object is hovered — the ring tightens. */
  active?: boolean;
  /** Multiplier on the mark's natural size. */
  size?: number;
}) {
  const rootRef = useRef<Group>(null);
  const ringRef = useRef<Group>(null);
  const pingRef = useRef<Group>(null);
  const pingMatRef = useRef<MeshBasicMaterial>(null);
  const invalidate = useThree((s) => s.invalidate);

  // Appear with the object it marks.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const to = visible ? size : 0;
      gsap.to(root.scale, {
        x: to,
        y: to,
        z: to,
        duration: prefersReducedMotion() ? 0 : visible ? 0.34 : 0.18,
        ease: visible ? EASE.settle : EASE.exit,
        overwrite: "auto",
        onUpdate: invalidate,
        onComplete: invalidate,
      });
    },
    { dependencies: [visible, size, invalidate] },
  );

  // The invitation: a ring leaves the mark and dissolves outward. Runs
  // only while the mark is idle — hovering answers it, and reduced motion
  // declines it (the mark stays, the ping doesn't).
  useGSAP(
    () => {
      const ping = pingRef.current;
      const mat = pingMatRef.current;
      if (!ping || !mat) return;
      if (!visible || active || prefersReducedMotion()) {
        gsap.set(mat, { opacity: 0 });
        invalidate();
        return;
      }
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.75, onUpdate: invalidate });
      tl.fromTo(
        ping.scale,
        { x: 0.45, y: 0.45, z: 0.45 },
        { x: 2.4, y: 2.4, z: 2.4, duration: 1.5, ease: "power2.out" },
        0,
      ).fromTo(mat, { opacity: 0.6 }, { opacity: 0, duration: 1.5, ease: "power1.out" }, 0);
      return () => {
        tl.kill();
        gsap.set(mat, { opacity: 0 });
        invalidate();
      };
    },
    { dependencies: [visible, active, invalidate] },
  );

  // The ring closes in on the dot under the pointer.
  useGSAP(
    () => {
      const ring = ringRef.current;
      if (!ring) return;
      const to = active ? 0.78 : 1;
      gsap.to(ring.scale, {
        x: to,
        y: to,
        z: to,
        duration: prefersReducedMotion() ? 0 : DUR.hover,
        ease: EASE.settle,
        overwrite: "auto",
        onUpdate: invalidate,
        onComplete: invalidate,
      });
    },
    { dependencies: [active, invalidate] },
  );

  return (
    <Billboard position={position}>
      {/* Starts collapsed: the mark always arrives, never just appears. */}
      <group ref={rootRef} scale={0}>
        {/* The ping — behind everything, on its own scale so it never
            disturbs the mark it leaves from. */}
        <group ref={pingRef}>
          <mesh raycast={() => null}>
            <ringGeometry args={[0.0125, 0.0138, 48]} />
            <meshBasicMaterial
              ref={pingMatRef}
              color={palette.hotspotInk}
              transparent
              opacity={0}
              toneMapped={false}
            />
          </mesh>
        </group>
        <mesh raycast={() => null}>
          <circleGeometry args={[0.0055, 32]} />
          <meshBasicMaterial color={palette.hotspotInk} toneMapped={false} />
        </mesh>
        <group ref={ringRef}>
          <mesh raycast={() => null}>
            <ringGeometry args={[0.0125, 0.0138, 48]} />
            <meshBasicMaterial
              color={palette.hotspotInk}
              transparent
              opacity={0.55}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </Billboard>
  );
}
