"use client";

import { useGLTF } from "@react-three/drei";
import { DESK } from "./layout";
import { Room } from "./Room";
import { DeskModel } from "./desk/DeskModel";
import { GlbProp } from "./workspace/props/GlbProp";
import { Nameplate } from "./workspace/props/Nameplate";
import { PictureFrame } from "./workspace/props/PictureFrame";

const LAMP_GLB = "/models/desk-lamp.glb";
const GLASSES_GLB = "/models/glasses.glb";
const NOTEBOOK_GLB = "/models/notebook.glb";
const PENCIL_CUP_GLB = "/models/pencil-cup.glb";
const COFFEE_CUP_GLB = "/models/coffee-cup.glb";

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

      <group position={[0, DESK.topY, 0]}>
        {/* Back row — the tall anchors */}
        <GlbProp url={LAMP_GLB} height={0.42} position={[-0.54, 0, -0.15]} rotation-y={0.5} />
        <GlbProp url={PENCIL_CUP_GLB} height={0.17} position={[-0.13, 0, -0.2]} rotation-y={-0.4} />

        {/* Middle band */}
        <PictureFrame position={[-0.3, 0, 0.06]} rotation-y={0.28} />
        <GlbProp url={NOTEBOOK_GLB} height={0.02} position={[0.29, 0, -0.09]} rotation-y={-0.18} />

        {/* Front row — what a visitor reads first */}
        <Nameplate position={[0, 0, 0.12]} />
        <GlbProp url={GLASSES_GLB} height={0.045} position={[0.3, 0, 0.1]} rotation-y={0.35} />
        <GlbProp url={COFFEE_CUP_GLB} height={0.14} position={[0.53, 0, 0.03]} rotation-y={1.2} />
      </group>
    </group>
  );
}

useGLTF.preload(LAMP_GLB);
useGLTF.preload(GLASSES_GLB);
useGLTF.preload(NOTEBOOK_GLB);
useGLTF.preload(PENCIL_CUP_GLB);
useGLTF.preload(COFFEE_CUP_GLB);
