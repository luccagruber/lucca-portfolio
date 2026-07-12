import { profile } from "@/content/profile";

/**
 * The traditional act begins here — plain, readable, no storytelling
 * devices (vision: everything after the workspace prioritizes usability).
 */
export function About() {
  return (
    <section id="about" aria-label="About" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <p className="section-label mb-8">About</p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {profile.tagline}
        </h2>
        <div className="mt-10 space-y-6">
          {profile.about.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0 ? "text-xl text-ink" : "leading-relaxed text-ink-soft"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
