import { contact, identity } from '../data/projects.js'
import { useReveal } from '../hooks/useReveal.js'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="border-t border-ink-line">
      <div ref={ref} className="reveal mx-auto max-w-site px-5 sm:px-8 py-20 sm:py-28">
        <p className="section-label mb-3">Contact</p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium max-w-xl">
          If it makes sense, talk to me.
        </h2>

        <ul className="mt-10 space-y-1">
          {contact.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="group inline-flex items-baseline gap-4 py-2"
              >
                <span className="w-20 text-xs uppercase tracking-widest text-bone-faint">
                  {c.label}
                </span>
                <span className="text-bone-muted group-hover:text-moss-bright transition-colors border-b border-transparent group-hover:border-moss-dim">
                  {c.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-20 flex items-center justify-between text-xs text-bone-faint">
          <span>© {new Date().getFullYear()} {identity.name}</span>
          <a href="#top" className="hover:text-bone transition-colors">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
