import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 pb-24 sm:pb-32">
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
      </div>
    </section>
  );
}
