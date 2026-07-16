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
       * It begins at the scene's own background colour (--color-stage) so
       * the hand-off from the canvas is a colour match, not a new colour,
       * and cools into the bright foot grey by the bottom of the page.
       *
       * No fade, no overlap, no tricks: a climb-over dissolve was tried
       * twice here and rejected (user 2026-07-16 — "just bad"). The scene
       * scrolls away, the page continues. The spacer is plain breathing
       * room before the rail.
       */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-stage) 0%, var(--color-foot) 100%)",
        }}
      >
        <div aria-hidden="true" className="h-36 sm:h-48" />
        <ContactRail />
        <div aria-hidden="true" className="h-28 sm:h-40" />
        <Footer />
      </div>
    </main>
  );
}
