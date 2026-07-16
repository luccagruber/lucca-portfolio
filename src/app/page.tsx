import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import { Experience } from "@/experience/Experience";
import { ContactRail } from "@/portfolio/ContactRail";
import { Footer } from "@/portfolio/Footer";
import { SiteHeader } from "@/portfolio/SiteHeader";

/**
 * There is no second act any more. The workspace is the site: About is
 * written on the back of the photograph on the desk, the projects are in
 * the drawer. What is left over is the one thing that would be worse as
 * ceremony — the contact rail, which is just a footer, because contact is
 * a utility and utilities should not be discovered.
 */
export default function Home() {
  return (
    <main id="top">
      <h1 className="sr-only">{profile.name} — portfolio</h1>
      <SiteHeader />
      <Experience />
      {/*
       * The foot of the page is a single object — one gradient behind the
       * contact rail and the footer together, which are both transparent.
       *
       * It also has to dissolve the scene. The stage is a sticky 100svh
       * canvas, so when its section runs out the canvas is pushed upward
       * and its bottom edge lands in open screen, slicing the desk along a
       * hard line. Nothing painted *below* that edge can hide it. So the
       * foot climbs *over* the stage instead: `--foot-fade` of negative
       * margin pulls it up, z-index puts it in front, and its leading edge
       * fades in from fully transparent to the scene's own background
       * colour. The desk dissolves under it and the canvas's real edge is
       * covered by opaque paint by the time it arrives — there is no line
       * left to see.
       *
       * Two knobs:
       *
       * - `--foot-fade` — how much scrolling the desk takes to dissolve.
       *   It is used twice and the uses must match: the negative margin
       *   (how far the foot climbs over the canvas) and the gradient's
       *   first leg (transparent → stage across exactly that overlap).
       *   KEPT DELIBERATELY SMALL (user 2026-07-16): the dissolve is an
       *   exit garnish, not a scene event. It must stay off screen while
       *   the drawer is open and browsable — it only appears during the
       *   final stretch of scroll, when the scene is already leaving.
       * - `--foot-hold` — clear, fully-opaque breathing room between the
       *   finished dissolve and the contact rail, so the two parts never
       *   feel stuck together.
       *
       * The spacer above the rail is fade + hold: the desk dissolves
       * through the first stretch and the second stays empty on purpose.
       * The stage→foot grey ramp runs from the end of the fade to the
       * bottom of the page, so it begins at the scene's exact background
       * colour and only then cools into the foot grey.
       *
       * Because it lies *over* the canvas, this wrapper takes no pointer
       * events — otherwise the strip it overlaps would swallow clicks
       * meant for the folders in the drawer below. The rail and the footer
       * switch them back on for themselves.
       */}
      <div
        className="pointer-events-none relative z-1"
        style={
          {
            "--foot-fade": "10rem",
            "--foot-hold": "8rem",
            marginTop: "calc(var(--foot-fade) * -1)",
            backgroundImage:
              "linear-gradient(to bottom, transparent 0, var(--color-stage) var(--foot-fade), var(--color-foot) 100%)",
          } as CSSProperties
        }
      >
        {/* Not empty space — the desk fades out behind the first stretch
            and the second holds clear before the rail. */}
        <div
          aria-hidden="true"
          style={{ height: "calc(var(--foot-fade) + var(--foot-hold))" }}
        />
        <ContactRail />
        <Footer />
      </div>
    </main>
  );
}
