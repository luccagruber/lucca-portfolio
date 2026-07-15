"use client";

import { DESK } from "./layout";
import { Room } from "./Room";
import { DeskModel } from "./desk/DeskModel";
import { CoffeeCup } from "./workspace/props/CoffeeCup";
import { Nameplate } from "./workspace/props/Nameplate";
import { PictureFrame } from "./workspace/props/PictureFrame";

/**
 * The workspace system renders the set: the room, the real desk (which
 * owns its drawer, which reveals the folders) and the generated props on
 * the desk top. Vision: every visible object has a reason to exist; no
 * monitors, no keyboards, no clutter. Prop positions are desk-top-local.
 */
export function Workspace() {
  return (
    <group>
      <Room />
      <DeskModel />

      {/* Three props, one story: photo left, name center, coffee right —
          spaced across the true desk width (x ∈ [-0.7, 0.7]). */}
      <group position={[0, DESK.topY, 0]}>
        <PictureFrame position={[-0.46, 0, -0.08]} rotation-y={0.3} />
        <Nameplate position={[0, 0, 0.06]} />
        <CoffeeCup position={[0.44, 0, 0.02]} />
      </group>
    </group>
  );
}
