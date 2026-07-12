import { projects, featured } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import FeaturedProject from './FeaturedProject.jsx'
import { useReveal } from '../hooks/useReveal.js'

export default function Projects() {
  const headingRef = useReveal()
  // Featured sits after the first card: business first, then the star piece.
  const [first, ...rest] = projects

  return (
    <section id="work" className="mx-auto max-w-site px-5 sm:px-8 py-20 sm:py-28">
      <div ref={headingRef} className="reveal mb-12 sm:mb-16">
        <p className="section-label mb-3">Work</p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium">
          Real things. Not school projects.
        </h2>
      </div>

      <div className="space-y-6">
        <ProjectCard project={first} />
        <FeaturedProject project={featured} />
        {rest.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
