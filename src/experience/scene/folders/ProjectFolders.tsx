"use client";

import type { ProjectId } from "@/content/types";
import { projectReports } from "@/content/projects";
import { Folder, type FolderHome } from "./Folder";

/**
 * Exactly two folders, staggered in the drawer like real files: the front
 * file tab-left, the rear file slightly higher, tab-right, so both labels
 * read from the camera. Slight rotations — believable imperfection.
 */
const HOMES: Record<ProjectId, FolderHome> = {
  "accul-rebugr": { position: [-0.005, 0, 0.105], rotationY: -0.045, tabX: -0.062 },
  "gruber-goal": { position: [0.008, 0.026, -0.06], rotationY: 0.05, tabX: 0.062 },
};

export function ProjectFolders() {
  return (
    <>
      {projectReports.map((report) => (
        <Folder key={report.id} report={report} home={HOMES[report.id]} />
      ))}
    </>
  );
}
