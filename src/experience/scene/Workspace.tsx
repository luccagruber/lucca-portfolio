"use client";

import { useGLTF } from "@react-three/drei";
import { DESK } from "./layout";
import { Room } from "./Room";
import { DeskModel } from "./desk/DeskModel";
import { GlbProp } from "./workspace/props/GlbProp";
import { Nameplate } from "./workspace/props/Nameplate";
import { PictureFrame } from "./workspace/props/PictureFrame";

const COFFEE_CUP_GLB = "/models/coffee-cup.glb";
const LAMP_GLB = "/models/desk-lamp.glb";
const GLASSES_GLB = "/models/glasses.glb";
const NOTEBOOK_GLB = "/models/notebook.glb";
const PENCIL_CUP_GLB = "/models/pencil-cup.glb";

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
        {/* Core three */}
        <PictureFrame position={[-0.35, 0, -0.06]} rotation-y={0.28} />
        <Nameplate position={[0, 0, 0.14]} />
        <GlbProp url={COFFEE_CUP_GLB} height={0.14} position={[0.55, 0, -0.14]} rotation-y={0} />

        {/* Supporting cast */}
        <GlbProp url={LAMP_GLB} height={0.42} position={[-0.57, 0, -0.17]} rotation-y={0.5} />
        <GlbProp url={PENCIL_CUP_GLB} height={0.17} position={[-0.14, 0, -0.21]} rotation-y={-0.4} />
        <GlbProp url={NOTEBOOK_GLB} height={0.02} position={[0.3, 0, 0.04]} rotation-y={-0.16} />
        <GlbProp url={GLASSES_GLB} height={0.045} position={[0.31, 0, 0.18]} rotation-y={0.3} />
      </group>
    </group>
  );
}

useGLTF.preload(COFFEE_CUP_GLB);
useGLTF.preload(LAMP_GLB);
useGLTF.preload(GLASSES_GLB);
useGLTF.preload(NOTEBOOK_GLB);
useGLTF.preload(PENCIL_CUP_GLB);
