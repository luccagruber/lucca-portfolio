"use client";

import { useGLTF } from "@react-three/drei";
import { DESK } from "./layout";
import { Room } from "./Room";
import { DeskModel } from "./desk/DeskModel";
import { GlbProp } from "./workspace/props/GlbProp";
import { Nameplate } from "./workspace/props/Nameplate";
import { PictureFrame } from "./workspace/props/PictureFrame";

const COFFEE_CUP_GLB = "/models/coffee-cup.glb";
const GLASSES_GLB = "/models/glasses.glb";
const NOTEBOOK_GLB = "/models/notebook.glb";
const MACBOOK_GLB = "/models/macbook.glb";

/**
 * The workspace system renders the set: the room, the real desk (which
 * owns its drawer, which reveals the folders) and the props on the desk
 * top. Vision: every visible object has a reason to exist; no monitors,
 * no keyboards, no clutter. Prop positions are desk-top-local
 * (x ∈ [-0.7, 0.7], z ∈ [-0.314, 0.286]) and deliberately staggered in
 * depth — nothing sits on one line.
 */
export function Workspace() {
  return (
    <group>
      <Room />
      <DeskModel />

      {/* The core trio holds its top-view composition regardless of the
          rest: frame mid-left, nameplate centered near the front edge,
          Starbucks cup top-right (back-right corner), logo to the camera.
          The supporting props dress the remaining space without ever
          crowding the trio. */}
      <group position={[0, DESK.topY, 0]}>
        {/* Mid-left cluster — the personal corner: photo behind, plaque
            in front, angled toward each other so both read as objects. */}
        <PictureFrame position={[-0.38, 0, -0.08]} rotation-y={0.3} />
        <Nameplate position={[-0.27, 0, 0.1]} rotation-y={-0.22} />

        {/* Center — the closed MacBook, a few degrees off square. */}
        <GlbProp url={MACBOOK_GLB} height={0.015} position={[0.05, 0, -0.02]} rotation-y={0.06} />

        {/* Right — notebook with the glasses resting on its cover. */}
        <GlbProp url={NOTEBOOK_GLB} height={0.013} position={[0.34, 0, 0.03]} rotation-y={-0.2} />
        <GlbProp url={GLASSES_GLB} height={0.04} position={[0.34, 0.013, 0.02]} rotation-y={0.5} />

        {/* Top-right corner — the cup, logo to the camera. */}
        <GlbProp url={COFFEE_CUP_GLB} height={0.14} position={[0.55, 0, -0.14]} rotation-y={0} />
      </group>
    </group>
  );
}

useGLTF.preload(COFFEE_CUP_GLB);
useGLTF.preload(GLASSES_GLB);
useGLTF.preload(NOTEBOOK_GLB);
useGLTF.preload(MACBOOK_GLB);
