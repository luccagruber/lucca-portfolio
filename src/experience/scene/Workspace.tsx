"use client";

import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { DESK, PROP_ARRANGEMENTS, isPortraitAspect } from "./layout";
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
 * no keyboards, no clutter.
 *
 * The set is dressed for the house: a portrait viewport gets the portrait
 * arrangement (the same objects, pulled into the band the phone camera
 * can actually see) and everything else gets the authored desktop one.
 * Placement data lives in layout.PROP_ARRANGEMENTS.
 */
export function Workspace() {
  const size = useThree((s) => s.size);
  const props =
    PROP_ARRANGEMENTS[
      isPortraitAspect(size.width / Math.max(size.height, 1)) ? "portrait" : "landscape"
    ];

  return (
    <group>
      <Room />
      <DeskModel />

      <group position={[0, DESK.topY, 0]}>
        {/* The picture frame — the About door — and the notebook with the
            glasses on it are the two props every arrangement carries. */}
        <PictureFrame position={props.frame.position} rotation-y={props.frame.rotY} />
        <GlbProp
          url={NOTEBOOK_GLB}
          height={0.013}
          position={props.notebook.position}
          rotation-y={props.notebook.rotY}
        />
        <GlbProp
          url={GLASSES_GLB}
          height={0.04}
          position={props.glasses.position}
          rotation-y={props.glasses.rotY}
        />

        {/* Set dressing for the wide shot only — a phone stands too close
            to the drawer for any of it to be more than a cropped edge. */}
        {props.nameplate ? (
          <Nameplate position={props.nameplate.position} rotation-y={props.nameplate.rotY} />
        ) : null}
        {props.macbook ? (
          <GlbProp
            url={MACBOOK_GLB}
            height={0.015}
            position={props.macbook.position}
            rotation-y={props.macbook.rotY}
          />
        ) : null}
        {props.cup ? (
          <GlbProp
            url={COFFEE_CUP_GLB}
            height={0.14}
            position={props.cup.position}
            rotation-y={props.cup.rotY}
          />
        ) : null}
      </group>
    </group>
  );
}

useGLTF.preload(COFFEE_CUP_GLB);
useGLTF.preload(GLASSES_GLB);
useGLTF.preload(NOTEBOOK_GLB);
useGLTF.preload(MACBOOK_GLB);
