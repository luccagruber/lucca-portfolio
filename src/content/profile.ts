/**
 * Personal content — the About print, the contact rail, and the workspace
 * nameplate. Edit copy here, not in components.
 *
 * `about` is read on the back of the picture frame (AboutViewer): the first
 * entry is the lede above the rule, the rest is the body under it. Keep it
 * short enough to sit in a portrait print without scrolling.
 *
 * Line breaks inside an entry are honoured (the viewer sets
 * `whitespace-pre-line`), so the lede's two lines always break where they
 * are written here rather than wherever the column happens to run out.
 */

export const profile = {
  name: "Lucca Gruber Rodrigues",
  /** Engraved on the desk nameplate. */
  nameplate: "LUCCA GRUBER RODRIGUES",
  location: "Rijswijk, Netherlands",
  tagline: "You have a problem. I can probably solve it.",
  about: [
    "Lucca Gruber Rodrigues,\n16 years old.",
    "Full availability, high adaptability, and a genuine appetite for the work.",
    "The approach is simple: listen properly, understand what you need, deliver without overcomplicating it, and be honest about limits. Whatever gets taken on, gets done properly. Fast learner — in the real sense of the phrase, what gets learned along the way gets applied immediately.",
    "If that's what you're looking for — get in touch.",
  ],
  contact: [
    { label: "Email", value: "luccagruber1@gmail.com", href: "mailto:luccagruber1@gmail.com" },
    { label: "WhatsApp", value: "wa.me/310631085489", href: "https://wa.me/310631085489" },
    { label: "LinkedIn", value: "linkedin.com/in/luccagruber1", href: "https://www.linkedin.com/in/luccagruber1/" },
    { label: "GitHub", value: "github.com/luccagruber", href: "https://github.com/luccagruber" },
  ],
} as const;
