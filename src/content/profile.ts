import type { Locale } from "@/lib/locale";

/**
 * Personal content — the About print, the contact rail, and the workspace
 * nameplate. Edit copy here, not in components.
 *
 * `about` is read on the back of the picture frame (AboutViewer): the first
 * entry is the lede above the rule, the rest is the body under it.
 *
 * This text is the site's centre of gravity — the positioning. Both the
 * English and the Português are Lucca's own, word for word (2026-07-26),
 * and the Português is a translation of the *tone* first: the exchange
 * stays implicit, nothing is explained, and the humility does the work the
 * boasting would have done badly. The print is sized around this writing,
 * not the other way round — do not trim it to fit a box. Punctuation is
 * deliberate in every language.
 *
 * Line breaks inside an entry are honoured (the viewer sets
 * `whitespace-pre-line`), so the lede's two lines always break where they
 * are written here rather than wherever the column happens to run out.
 */

/**
 * The printed photograph — in the desk frame and on the front of the DOM
 * frame that replaces it. Portrait 3:4, cropped close (see PictureFrame).
 *
 * Versioned in the filename on purpose: the host serves /images/* without
 * Cache-Control, so overwriting a photo in place leaves every returning
 * visitor looking at the old one. New photo, new number.
 */
export const PORTRAIT_SRC = "/images/portrait-v2.jpg";

export const profile = {
  name: "Lucca Gruber Rodrigues",
  /** Engraved on the desk nameplate. */
  nameplate: "LUCCA GRUBER RODRIGUES",
  location: "Rijswijk, Netherlands",
  contact: [
    /*
     * `print` is the one thing on a cell people need to TAKE rather than
     * follow — it is printed under the label as real, selectable text.
     * Only the two that get copied into a phone or an address bar have it.
     * Labels are brand names and stay untranslated in every language.
     */
    {
      label: "Email",
      value: "luccagruber1@gmail.com",
      href: "mailto:luccagruber1@gmail.com",
      print: "luccagruber1@gmail.com",
    },
    {
      label: "WhatsApp",
      value: "wa.me/310631085489",
      href: "https://wa.me/310631085489",
      print: "+31 6 31085489",
    },
    { label: "LinkedIn", value: "linkedin.com/in/luccagruber1", href: "https://www.linkedin.com/in/luccagruber1/" },
    { label: "GitHub", value: "github.com/luccagruber", href: "https://github.com/luccagruber" },
  ],
} as const;

export interface ProfileText {
  /** Feeds the page <meta description>. */
  tagline: string;
  /** [0] is the lede above the rule; the rest is the body under it. */
  about: readonly string[];
}

export const profileText: Record<Locale, ProfileText> = {
  en: {
    tagline:
      "If you run something real – any size – and you'd let me see how it's run from the inside while I help wherever I'm needed: get in touch.",
    about: [
      "Lucca Gruber Rodrigues,\n16 years old.",
      "I'm not here to sell you a service. I'm here to understand how a real business actually works – how it's structured, how its parts hand work to each other, where the money goes and why the decisions were made this way and not another. From the inside. From people who run one.",
      "I'm available, I'm genuinely strong with technology, and I connect things fast – that's my one real talent, and it's why what I learn on Monday tends to be useful to you by Friday, usually saving you time, money or effort.",
      "I'm 16 and I say it first, before anyone has to point it out. I'm not a professional yet and I'm not going to perform being one. But I've built and run a business of my own across two continents; there's a file on it in the drawer. I keep my word, I'm direct, and I can sit in an uncomfortable conversation without flinching. The rest I want to be taught.",
      "If you run something real – any size – and you'd let me see how it's run from the inside while I help wherever I'm needed: get in touch.",
    ],
  },

  pt: {
    tagline:
      "Se você toca algo real – de qualquer tamanho – e me deixar ver como funciona por dentro, enquanto eu ajudo no que for preciso: vamos conversar.",
    about: [
      "Lucca Gruber Rodrigues,\n16 anos.",
      "Não estou aqui para te vender um serviço. Estou aqui para entender como um negócio real funciona de verdade – como ele é estruturado, como as peças se conectam, para onde o dinheiro vai e por que as decisões foram tomadas de um jeito e não de outro. Por dentro. Com quem realmente toca um.",
      "Estou disponível, sou genuinamente forte com tecnologia e conecto as coisas rápido – esse é o meu talento mais forte. E é por isso que o que eu aprendo na segunda-feira costuma ser útil para você na sexta, geralmente poupando tempo, dinheiro ou esforço.",
      "Tenho 16 anos e falo isso primeiro, antes que alguém precise apontar. Ainda não sou um profissional e não vou fingir ser um. Mas eu já construí e toco um negócio próprio em dois continentes; tem um arquivo sobre isso na gaveta. Cumpro minha palavra, sou direto e tenho maturidade suficiente para sentar numa conversa desconfortável. O resto, eu quero aprender.",
      "Se você toca algo real – de qualquer tamanho – e me deixar ver como funciona por dentro, enquanto eu ajudo no que for preciso: vamos conversar.",
    ],
  },
};
