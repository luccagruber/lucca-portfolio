import { about } from '../data/projects.js'
import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="border-t border-ink-line">
      <div ref={ref} className="reveal mx-auto max-w-site px-5 sm:px-8 py-20 sm:py-28">
        <p className="section-label mb-3">About</p>
        <div className="max-w-2xl space-y-5">
          {about.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'font-display text-2xl sm:text-3xl text-bone leading-snug'
                  : 'text-bone-muted leading-relaxed sm:text-lg'
              }
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
