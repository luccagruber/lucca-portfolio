"use client";

import { useExperience } from "./state/store";
import { projectReports } from "@/content/projects";
import { profile } from "@/content/profile";

export function WebglFallbackWorkspace() {
  const selectProject = useExperience((s) => s.selectProject);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Sleek corporate nameplate on the virtual desk */}
      <div className="mb-16 text-center">
        <div className="relative inline-block bg-[#26262A] px-10 py-4 rounded shadow-lg border border-[#3e3e42] ring-1 ring-black/20">
          {/* Subtle wood-like or metallic highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
          <h2 className="font-sans text-sm sm:text-base font-bold tracking-[0.24em] text-[#DCDAD4] select-none">
            {profile.nameplate}
          </h2>
        </div>
        <p className="mt-4 font-sans text-[10px] tracking-widest text-ink-faint uppercase">
          Interactive Workspace (2D Fallback Mode)
        </p>
      </div>

      {/* Grid of Manila Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl justify-center">
        {projectReports.map((report, index) => {
          const cover = report.pages[0];
          const kicker = cover.blocks.find((b) => b.kind === "kicker");
          const lede = cover.blocks.find((b) => b.kind === "lede");
          
          // Accul Rebugr gets tab on left, Gruber Goal gets tab on right
          const isLeftTab = index === 0;

          return (
            <button
              key={report.id}
              onClick={() => selectProject(report.id)}
              className="relative h-[23rem] w-full max-w-[19rem] mx-auto cursor-pointer group text-left border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-8 focus-visible:rounded-lg"
              aria-label={`Open project file: ${report.name}`}
            >
              {/* BACK COVER & TAB */}
              <div 
                className={`absolute top-0 h-8 px-4 bg-[#CDBA8C] border border-[#B8A67B] border-b-0 rounded-t-md flex items-center justify-center font-sans text-[9px] font-bold tracking-wider text-tab-ink select-none ${
                  isLeftTab ? "left-4" : "right-4"
                }`}
              >
                {report.fileLabel}
              </div>
              <div className="absolute inset-x-0 bottom-0 top-8 bg-[#CDBA8C] rounded-lg border border-[#B8A67B] shadow-sm select-none" />

              {/* PEEKING PAPER SHEET */}
              <div className="absolute inset-x-3 bottom-8 top-12 bg-[#FBFAF7] rounded border border-black/5 p-5 shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-7 group-focus:-translate-y-7 flex flex-col justify-between">
                <div>
                  {kicker?.kind === "kicker" && (
                    <span className="font-sans text-[8.5px] font-semibold tracking-widest text-ink-soft/70 uppercase block">
                      {kicker.text}
                    </span>
                  )}
                  <h3 className="text-base font-bold tracking-tight text-ink mt-1.5">
                    {report.name}
                  </h3>
                  {lede?.kind === "lede" && (
                    <p className="text-[11px] leading-relaxed text-ink-soft mt-3 line-clamp-5">
                      {lede.text}
                    </p>
                  )}
                </div>
                
                <span className="font-sans text-[8px] tracking-wider text-ink-faint uppercase select-none">
                  FILE ID: {report.id}
                </span>
              </div>

              {/* FRONT COVER */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-[#D9C89E] rounded-b-lg border-t border-[#E5D8B6] shadow-[0_-3px_8px_rgba(0,0,0,0.03)] flex items-end justify-between p-4 pointer-events-none select-none">
                <span className="font-sans text-[9px] tracking-widest text-tab-ink font-semibold opacity-70">
                  {report.fileLabel}
                </span>
                <span className="font-sans text-[8.5px] tracking-widest text-tab-ink font-bold opacity-60 flex items-center gap-1 group-hover:opacity-90 transition-opacity">
                  OPEN FILE <span className="text-[10px]">→</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-16 border-t border-line/60 pt-6 w-full max-w-sm text-center">
        <p className="text-[11px] text-ink-faint leading-relaxed font-sans">
          To view projects, click on a folder file. Use left/right arrow keys or buttons inside to navigate pages, and Escape to close.
        </p>
      </div>
    </div>
  );
}
