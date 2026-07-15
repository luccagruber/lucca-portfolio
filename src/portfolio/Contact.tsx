import { profile } from "@/content/profile";

/**
 * Renders its section content only; the shared border/background/grid
 * wrapper (paired with About, side by side on desktop) lives in page.tsx.
 */
export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="mt-16 lg:mt-0">
      <p className="section-label mb-8">Contact</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        If it makes sense, talk to me.
      </h2>
      <ul className="mt-10 space-y-3">
        {profile.contact.map((entry) => (
          <li key={entry.label} className="flex items-baseline gap-6">
            <span className="w-20 shrink-0 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
              {entry.label}
            </span>
            <a
              href={entry.href}
              target={entry.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="text-lg text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {entry.value}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
