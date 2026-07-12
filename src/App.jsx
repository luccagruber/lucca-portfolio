import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function App() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-ink-line/60 bg-ink-950/80 backdrop-blur">
        <div className="mx-auto max-w-site flex items-center justify-between px-5 sm:px-8 h-14">
          <a href="#top" className="font-display text-bone text-sm tracking-wide hover:text-moss-bright transition-colors">
            LGR
          </a>
          <nav className="flex gap-5 sm:gap-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs sm:text-sm text-bone-muted hover:text-bone transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}
