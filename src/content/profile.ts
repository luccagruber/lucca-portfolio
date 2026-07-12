/**
 * Personal content for the traditional act (About / Contact / Footer) and
 * the workspace nameplate. Edit copy here, not in components.
 */

export const profile = {
  name: "Lucca Gruber Rodrigues",
  /** Engraved on the desk nameplate. */
  nameplate: "LUCCA GRUBER RODRIGUES",
  location: "Rijswijk, Netherlands",
  tagline: "You have a problem. I can probably solve it.",
  about: [
    "I'm 16, Brazilian, in the Netherlands since late 2025.",
    "I haven't arrived yet, and I know it. But I'm moving with real discipline toward one specific goal: get to a position where money stops being the constraint and everything after becomes a choice. No career dream, no passion story — just clear direction and consistent movement toward it.",
    "I took a job at Albert Heijn not just for the money, but to understand Dutch systems and culture from the inside. I'm learning Dutch — A2, getting better. When it stops being useful, I'll move.",
    "I work well with people. Not because I'm easy-going, but because I'm secure enough to let someone else be right when they are — and clear enough to say when they're not.",
    "If you're reading this and thinking I might be able to help with something — you're probably right. Get in touch.",
  ],
  contact: [
    { label: "Email", value: "accul.reburg@gmail.com", href: "mailto:accul.reburg@gmail.com" },
    // Add real profiles when ready — entries render in order:
    // { label: "LinkedIn", value: "linkedin.com/in/…", href: "https://…" },
    // { label: "GitHub", value: "github.com/…", href: "https://…" },
  ],
} as const;
