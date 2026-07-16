"use client";

import { useRef, useState } from "react";
import { RoundedBox, useCursor, useTexture } from "@react-three/drei";
import { useThree, type ThreeElements, type ThreeEvent } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Euler, Quaternion, SRGBColorSpace, Vector3, type Group } from "three";
import { palette } from "@/lib/palette";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { APEX, CAMERA, FRAME, apexDistanceFor } from "@/experience/scene/layout";
import { Hotspot } from "@/experience/scene/Hotspot";

type GroupProps = ThreeElements["group"];

const HOVER_RAISE = 0.0035;

/**
 * Thin black picture frame standing upright with a real printed photo —
 * and the door to the About text. The print is whatever lives at
 * /images/portrait.jpg (portrait orientation, ~4:5).
 *
 * The frame owns only its own motion: the hover breath, the flight to the
 * camera apex (ending in the DOM hand-off, where the photograph turns
 * over), and the settle back onto the desk. The turn itself belongs to the
 * About viewer — this system just delivers the frame and steps out.
 *
 * Structure: the caller's props pose the ANCHOR; `rootRef` is the animated
 * body, and its resting rotation is the frame's lean on its easel leg.
 */
export function PictureFrame(props: GroupProps) {
  const rootRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera);

  const photo = useTexture("/images/portrait.jpg", (t) => {
    t.colorSpace = SRGBColorSpace;
  });

  const about = useExperience((s) => s.about);
  const viewer = useExperience((s) => s.viewer);

  const [hovered, setHovered] = useState(false);
  const interactive = about === "closed" && viewer === "closed";
  useCursor(hovered && interactive);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const d = (x: number) => (prefersReducedMotion() ? 0 : x);

      if (about === "frame-lifting") {
        const anchor = root.parent;
        if (!anchor) return;
        anchor.updateWorldMatrix(true, false);

        // Present the frame centered on the camera's (pitched) view axis,
        // its face parallel to the image plane, filling
        // APEX.heightFraction of the viewport.
        const fov = "fov" in camera ? (camera.fov as number) : CAMERA.fov;
        const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        const frameUp = new Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
        const worldTarget = camera.position
          .clone()
          .addScaledVector(forward, apexDistanceFor(fov, FRAME.height))
          // The frame's origin is its bottom-center; the apex distance
          // sizes it from the center.
          .addScaledVector(frameUp, -FRAME.height / 2);
        const local = anchor.worldToLocal(worldTarget.clone());

        // Exact target rotation: whatever cancels the anchor's own pose
        // and leaves the frame square to the camera. (The anchor yaws, so
        // this cannot be a per-axis guess the way a folder's can.)
        const anchorQuat = anchor.getWorldQuaternion(new Quaternion());
        const targetQuat = anchorQuat.invert().multiply(camera.quaternion);
        const targetEuler = new Euler().setFromQuaternion(targetQuat, root.rotation.order);

        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => {
            // Measure the settled frame's screen quad and hand the DOM
            // frame its exact frame, then step out of the picture. The
            // frame's face is parallel to the image plane, so its height
            // runs along frameUp, not world Y.
            const origin = root.getWorldPosition(new Vector3());
            const top = origin.clone().addScaledVector(frameUp, FRAME.height);
            const o = origin.project(camera);
            const t = top.project(camera);
            useExperience.getState().aboutFrameLifted({
              x: ((o.x + t.x) / 2 + 1) * 50,
              y: (1 - (o.y + t.y) / 2) * 50,
              h: Math.abs(t.y - o.y) * 50,
            });
            root.visible = false;
            invalidate();
          },
        });
        // Up off the desk first, then the glide to the apex.
        tl.to(root.position, { y: `+=${APEX.liftY * 0.6}`, duration: d(0.26), ease: "power2.out" }, 0)
          .to(
            root.position,
            { y: local.y, duration: d(DUR.folderFly - 0.3), ease: EASE.glide },
            d(0.3),
          )
          .to(
            root.position,
            { x: local.x, z: local.z, duration: d(DUR.folderFly - 0.22), ease: EASE.glide },
            d(0.22),
          )
          .to(
            root.rotation,
            {
              x: targetEuler.x,
              y: targetEuler.y,
              z: targetEuler.z,
              duration: d(DUR.folderFly - 0.2),
              ease: EASE.glide,
            },
            d(0.18),
          );
      } else if (about === "frame-returning") {
        root.visible = true;
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().aboutFrameReturned(),
        });
        tl.to(
          root.rotation,
          { x: FRAME.tilt, y: 0, z: 0, duration: d(DUR.folderReturn * 0.8), ease: EASE.glide },
          0,
        )
          .to(root.position, { x: 0, z: 0, duration: d(DUR.folderReturn * 0.85), ease: EASE.glide }, 0)
          .to(
            root.position,
            { y: APEX.liftY * 0.5, duration: d(DUR.folderReturn * 0.5), ease: EASE.glide },
            0,
          )
          .to(root.position, { y: 0, duration: d(0.32), ease: EASE.settle }, d(DUR.folderReturn * 0.52));
      } else if (about === "closed") {
        gsap.set(root.position, { x: 0, y: 0, z: 0 });
        gsap.set(root.rotation, { x: FRAME.tilt, y: 0, z: 0 });
        root.visible = true;
        invalidate();
      } else {
        // The DOM frame has the moment: stay out of the picture.
        root.visible = false;
        invalidate();
      }
    },
    { dependencies: [about, invalidate] },
  );

  const breathe = (up: boolean) => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    gsap.to(root.position, {
      y: up ? HOVER_RAISE : 0,
      duration: DUR.hover,
      ease: EASE.settle,
      overwrite: "auto",
      onUpdate: invalidate,
    });
  };

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(true);
    breathe(true);
  };
  const onPointerOut = () => {
    setHovered(false);
    if (interactive) breathe(false);
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(false);
    useExperience.getState().openAbout();
  };

  return (
    <group {...props}>
      <group ref={rootRef} rotation-x={FRAME.tilt}>
        {/* Generous invisible hit area — usability over realism */}
        <mesh
          position={[0, FRAME.height / 2, 0]}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          onClick={onClick}
        >
          <boxGeometry args={[FRAME.width + 0.03, FRAME.height + 0.03, 0.07]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Frame */}
        <RoundedBox
          args={[FRAME.width, FRAME.height, 0.008]}
          radius={0.002}
          smoothness={2}
          position={[0, FRAME.height / 2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={palette.matteBlack} roughness={0.5} metalness={0.12} />
        </RoundedBox>
        {/* Print — fills the frame to a thin black border, no mat */}
        <mesh position={[0, FRAME.height / 2, 0.0045]}>
          <planeGeometry args={[0.099, 0.132]} />
          <meshStandardMaterial map={photo} roughness={0.85} metalness={0} />
        </mesh>
        {/* Easel leg */}
        <mesh position={[0, 0.045, -0.028]} rotation-x={0.5} castShadow>
          <boxGeometry args={[0.012, 0.105, 0.004]} />
          <meshStandardMaterial color={palette.matteBlack} roughness={0.5} metalness={0.12} />
        </mesh>

        {/* "Turn me over" — the desk's only click mark. */}
        <Hotspot position={[0, FRAME.height + 0.032, 0]} visible={interactive} active={hovered} />
      </group>
    </group>
  );
}
