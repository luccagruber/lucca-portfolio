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
    "Lucca Gruber Rodrigues, 16 years old.",
    "Plenty of time, plenty of energy, and adaptability is a given. Learning is constant — and so is the work ethic behind it.",
    "The goal is always the same: understand what's needed, make sure it's delivered, and be honest when something is outside scope. What gets learned, gets applied fast.",
    "There are people who need exactly what's on offer here. Get in touch.",
  ],
  contact: [
    { label: "Email", value: "luccagruber1@gmail.com", href: "mailto:luccagruber1@gmail.com" },
    { label: "WhatsApp", value: "wa.me/310631085489", href: "https://wa.me/310631085489" },
    { label: "LinkedIn", value: "linkedin.com/in/luccagruber1", href: "https://www.linkedin.com/in/luccagruber1/" },
    { label: "GitHub", value: "github.com/luccagruber", href: "https://github.com/luccagruber" },
  ],
} as const;
