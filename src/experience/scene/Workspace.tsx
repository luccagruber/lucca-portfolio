"use client";

import { LAYOUT } from "./layout";
import { Desk, DESK_TOP_Y } from "./workspace/Desk";
import { Partition } from "./workspace/Partition";
import { CoffeeCup } from "./workspace/props/CoffeeCup";
import { Nameplate } from "./workspace/props/Nameplate";
import { PaperStack } from "./workspace/props/PaperStack";
import { PenHolder } from "./workspace/props/PenHolder";
import { PictureFrame } from "./workspace/props/PictureFrame";
import { FilingCabinet } from "./cabinet/FilingCabinet";

/**
 * The workspace system renders the cubicle: partition, desk, props and the
 * filing cabinet (which owns its drawer, which reveals the folders).
 * Vision: every visible object has a reason to exist; no monitors, no
 * keyboards, no clutter. Prop positions are desk-local.
 */
export function Workspace() {
  return (
    <group>
      <Partition />

      <group position={LAYOUT.desk.position}>
        <Desk />
        <CoffeeCup position={[0.32, DESK_TOP_Y, 0.17]} />
        <PenHolder position={[-0.44, DESK_TOP_Y, -0.17]} />
        <PictureFrame position={[-0.58, DESK_TOP_Y, -0.22]} rotation-y={0.5} />
        <PaperStack position={[0.56, DESK_TOP_Y, -0.14]} rotation-y={-0.07} />
        <Nameplate position={[0.13, DESK_TOP_Y, 0.26]} />
      </group>

      <FilingCabinet />
    </group>
  );
}
