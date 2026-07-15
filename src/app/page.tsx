import { profile } from "@/content/profile";
import { Experience } from "@/experience/Experience";
import { About } from "@/portfolio/About";
import { Contact } from "@/portfolio/Contact";
import { Footer } from "@/portfolio/Footer";

export default function Home() {
  return (
    <main id="top">
      <h1 className="sr-only">{profile.name} — portfolio</h1>
      <Experience />
      {/*
       * No border here on purpose: the seam between the 3D stage and the
       * page is dissolved by a vertical gradient that eases the scene's
       * grey (--color-stage) into a warm sand (--color-warm). The scene
       * appears to settle into the page rather than stop at a line.
       */}
      <div
        className="bg-warm"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-stage) 0%, var(--color-warm) 320px)",
        }}
      >
        <div className="mx-auto max-w-[100rem] px-6 py-28 sm:px-10 sm:py-36 lg:grid lg:grid-cols-[1fr_1px_1fr] lg:gap-x-16 xl:gap-x-24">
          <About />
          {/* Decorative hairline between the two panels — faded top and
              bottom so it reads as an ornament, not a table rule. */}
          <div
            aria-hidden="true"
            className="hidden lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, var(--color-line) 18%, var(--color-line) 82%, transparent)",
            }}
          />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}
