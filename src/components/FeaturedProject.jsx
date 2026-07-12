import { useReveal } from '../hooks/useReveal.js'
import { Expandable } from './Expandable.jsx'

export default function FeaturedProject({ project }) {
  const ref = useReveal()

  return (
    <article
      ref={ref}
      className="reveal rounded-lg border border-moss-dim bg-gradient-to-b from-moss-faint/60 to-ink-900 p-6 sm:p-12"
    >
      <p className="section-label mb-4">{project.label}</p>

      <h3 className="font-display text-3xl sm:text-5xl font-medium">{project.title}</h3>
      <p className="mt-3 text-moss-bright">{project.kicker}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <h4 className="text-xs uppercase tracking-widest text-bone-faint mb-4">The problem</h4>
          <div className="space-y-3">
            {project.problem.map((para, i) => (
              <p
                key={i}
                className={
                  i === project.problem.length - 1
                    ? 'font-display text-xl text-bone'
                    : 'text-bone-muted leading-relaxed'
                }
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-bone-faint mb-4">What it is</h4>
          <p className="text-bone-muted leading-relaxed">{project.solution}</p>
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm text-moss-bright hover:text-bone transition-colors border-b border-moss-dim"
          >
            {project.link.label} →
          </a>
        </div>
      </div>

      <div className="mt-10">
        <Expandable openLabel="Why it's technically hard">
          <div className="pt-6 border-t border-ink-line">
            <p className="text-bone-muted leading-relaxed max-w-3xl">{project.deepDive.intro}</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {project.deepDive.methods.map((m, i) => (
                <div key={m.name} className="rounded-lg border border-ink-line bg-ink-950/40 p-5">
                  <p className="text-xs text-moss-bright mb-2">0{i + 1}</p>
                  <h5 className="text-sm font-medium text-bone mb-2">{m.name}</h5>
                  <p className="text-sm text-bone-muted leading-relaxed">{m.detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-bone-muted leading-relaxed max-w-3xl">
              {project.deepDive.failsafe}
            </p>

            <h4 className="text-xs uppercase tracking-widest text-bone-faint mt-10 mb-4">
              Architecture
            </h4>
            <ul className="divide-y divide-ink-line border-y border-ink-line">
              {project.architecture.map((item) => (
                <li key={item.name} className="py-3 sm:flex sm:gap-4">
                  <span className="block sm:w-44 shrink-0 text-sm text-bone font-medium">
                    {item.name}
                  </span>
                  <span className="block text-sm text-bone-muted mt-0.5 sm:mt-0">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Expandable>
      </div>

      <div className="mt-10 sm:flex sm:items-center sm:justify-between gap-6 border-t border-ink-line pt-6">
        <p className="text-sm text-moss-bright">{project.status}</p>
        <p className="mt-3 sm:mt-0 text-sm text-bone-faint italic">{project.note}</p>
      </div>
    </article>
  )
}
