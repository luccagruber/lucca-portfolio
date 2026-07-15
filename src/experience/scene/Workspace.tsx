"use client";

import { useGLTF } from "@react-three/drei";
import { DESK } from "./layout";
import { Room } from "./Room";
import { DeskModel } from "./desk/DeskModel";
import { GlbProp } from "./workspace/props/GlbProp";
import { Nameplate } from "./workspace/props/Nameplate";
import { PictureFrame } from "./workspace/props/PictureFrame";

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

      {/* Three props, top-view composition: frame mid-left (deepest),
          nameplate centered near the front edge, cup at the very
          bottom-right corner, logo to the camera. */}
      <group position={[0, DESK.topY, 0]}>
        <PictureFrame position={[-0.35, 0, -0.06]} rotation-y={0.28} />
        <Nameplate position={[0, 0, 0.14]} />
        <GlbProp url={COFFEE_CUP_GLB} height={0.14} position={[0.55, 0, 0.19]} rotation-y={0} />
      </group>
    </group>
  );
}

useGLTF.preload(COFFEE_CUP_GLB);
