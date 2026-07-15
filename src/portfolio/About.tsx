import { profile } from "@/content/profile";

/**
 * The traditional act begins here — plain, readable, no storytelling
 * devices (vision: everything after the workspace prioritizes usability).
 * "About" is the headline itself (Fraunces); the body is set in Newsreader,
 * the same editorial serif the project reports use. Renders section content
 * only — the wide two-column wrapper shared with Contact lives in page.tsx.
 */
export function About() {
  return (
    <section id="about" aria-label="About">
      <h2 className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
        About
      </h2>
      <div className="mt-10 max-w-xl space-y-6">
        {profile.about.map((paragraph, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "font-serif text-2xl leading-snug text-ink"
                : "font-serif text-lg leading-relaxed text-ink-soft"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
