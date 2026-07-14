"use client";

import type { Group } from "three";
import type { ProjectId } from "@/content/types";
import { projectReports } from "@/content/projects";
import { FOLDER_POSE, FOLDER_SLOTS } from "../layout";
import { Folder } from "./Folder";

/**
 * The folder system's roster: exactly two manila files, side by side in
 * the drawer, both tabs readable from the straight-on camera. Each anchor
 * group carries a folder's slot + reveal pose and is animated by the
 * drawer system (revealing is the drawer's job); everything inside the
 * anchor belongs to the folder itself.
 */
export function ProjectFolders({
  registerAnchor,
}: {
  registerAnchor: (id: ProjectId, el: Group | null) => void;
}) {
  return (
    <>
      {projectReports.map((report) => {
        const slot = FOLDER_SLOTS[report.id];
        return (
          <group
            key={report.id}
            ref={(el) => registerAnchor(report.id, el)}
            position={[slot.x, FOLDER_POSE.hidden.y, slot.z]}
            rotation={[FOLDER_POSE.hidden.rotX, slot.rotY, 0]}
          >
            <Folder report={report} slot={slot} />
          </group>
        );
      })}
    </>
  );
}
