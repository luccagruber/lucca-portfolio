"use client";

import { DESK } from "./layout";
import { Room } from "./Room";
import { DeskModel } from "./desk/DeskModel";
import { CoffeeCup } from "./workspace/props/CoffeeCup";
import { Nameplate } from "./workspace/props/Nameplate";
import { PaperStack } from "./workspace/props/PaperStack";
import { PenHolder } from "./workspace/props/PenHolder";
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

      <group position={[0, DESK.topY, 0]}>
        <Nameplate position={[-0.12, 0, 0.1]} />
        <CoffeeCup position={[0.1, 0, 0.15]} />
        <PenHolder position={[-0.34, 0, -0.14]} />
        <PictureFrame position={[-0.52, 0, -0.16]} rotation-y={0.42} />
        <PaperStack position={[0.5, 0, -0.12]} rotation-y={-0.06} />
      </group>
    </group>
  );
}
