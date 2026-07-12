import { identity } from '../data/projects.js'

export default function Hero() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      {/* faint radial glow behind the name */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 30% 55%, rgba(74,124,89,0.12), transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-site w-full px-5 sm:px-8">
        <p className="hero-in text-sm text-bone-muted mb-5" style={{ animationDelay: '0.05s' }}>
          {identity.meta}
        </p>
        <h1
          className="hero-in font-display font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl"
          style={{ animationDelay: '0.15s' }}
        >
          {identity.name}
        </h1>
        <div className="hero-in mt-8 flex items-start gap-4" style={{ animationDelay: '0.35s' }}>
          <span aria-hidden className="mt-3 h-px w-10 sm:w-16 bg-moss shrink-0" />
          <p className="text-lg sm:text-2xl text-bone-muted font-light max-w-xl">
            You have a problem.{' '}
            <span className="text-bone">I can probably solve it.</span>
          </p>
        </div>
        <a
          href="#work"
          className="hero-in inline-flex items-center gap-2 mt-14 text-sm text-moss-bright hover:text-bone transition-colors group"
          style={{ animationDelay: '0.55s' }}
        >
          See the work
          <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
      </div>

      <style>{`
        .hero-in {
          opacity: 0;
          transform: translateY(14px);
          animation: heroIn 0.8s ease forwards;
        }
        @keyframes heroIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  )
}
