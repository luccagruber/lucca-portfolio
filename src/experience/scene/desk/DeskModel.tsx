"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial, type Object3D } from "three";
import { useExperience } from "@/experience/state/store";
import { DESK_GLB, DESK_NODES } from "../layout";
import { DeskDrawer } from "./DeskDrawer";

/**
 * The real desk — a Sketchfab-sourced GLB ("Office Desk 140x60" by
 * AleixoAlonso, CC-BY-4.0; credited in the footer). The scene graph is
 * mounted intact (its ancestor rotations cancel to identity); the body
 * and cabinet door are set dressing, and the named drawer node is handed
 * to the drawer system, which animates it in place.
 */
export function DeskModel() {
  const { scene } = useGLTF(DESK_GLB);

  const drawerNode = useMemo(() => {
    let drawer: Object3D | null = null;
    scene.traverse((obj) => {
      if (obj.name === DESK_NODES.drawer) drawer = obj;
      if (obj instanceof Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const material = obj.material as MeshStandardMaterial;
        material.roughness = 0.7; // keep the wood texture, tame the sheen
      }
    });
    if (!drawer) throw new Error("office-desk.glb is missing the drawer node");
    return drawer as Object3D;
  }, [scene]);

  // The desk is the last heavy asset — its arrival means the stage is set.
  const setSceneReady = useExperience((s) => s.setSceneReady);
  useEffect(() => setSceneReady(true), [setSceneReady]);

  return (
    <group>
      <primitive object={scene} />
      <DeskDrawer node={drawerNode} />
    </group>
  );
}

useGLTF.preload(DESK_GLB);
