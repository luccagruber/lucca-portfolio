import { useReveal } from '../hooks/useReveal.js'
import { Expandable } from './Expandable.jsx'

export default function ProjectCard({ project }) {
  const ref = useReveal()

  return (
    <article
      ref={ref}
      className="reveal group rounded-lg border border-ink-line bg-ink-900 p-6 sm:p-10 transition-colors duration-300 hover:border-moss-dim"
    >
      <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-display text-2xl sm:text-3xl font-medium group-hover:text-moss-bright transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-1 sm:mt-0 text-xs uppercase tracking-widest text-bone-faint shrink-0">
          {project.status}
        </p>
      </div>
      <p className="mt-2 text-sm text-moss-bright">{project.kicker}</p>

      <div className="mt-5 space-y-3 max-w-2xl">
        {project.summary.map((para, i) => (
          <p key={i} className="text-bone-muted leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <Expandable openLabel="The full story">
        <div className="pt-5 space-y-6 max-w-2xl border-t border-ink-line mt-1">
          {project.detail.map((section) => (
            <div key={section.heading}>
              <h4 className="text-xs uppercase tracking-widest text-bone-faint mb-3">
                {section.heading}
              </h4>
              <div className="space-y-3">
                {section.paras.map((para, i) => (
                  <p key={i} className="text-bone-muted leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {section.link && (
                <a
                  href={section.link.href}
                  className="mt-3 inline-block text-sm text-moss-bright hover:text-bone transition-colors border-b border-moss-dim"
                >
                  {section.link.label} →
                </a>
              )}
            </div>
          ))}
        </div>
      </Expandable>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="text-xs text-bone-muted border border-ink-line rounded-full px-3 py-1"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  )
}
