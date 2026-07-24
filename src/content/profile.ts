import type { Locale } from "@/lib/locale";

/**
 * Personal content — the About print, the contact rail, and the workspace
 * nameplate. Edit copy here, not in components.
 *
 * `about` is read on the back of the picture frame (AboutViewer): the first
 * entry is the lede above the rule, the rest is the body under it.
 *
 * This text is the site's centre of gravity — the positioning. The English
 * is Lucca's own, word for word (2026-07-24); the Português is a
 * translation of it, and it is a translation of the *tone* first: the
 * exchange stays implicit, nothing is explained, and the humility does the
 * work the boasting would have done badly. The print is sized around this
 * writing, not the other way round — do not trim it to fit a box.
 * Punctuation is deliberate in every language, including the parenthetical
 * aside before the full stop.
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
      "If you run something real – any size – and you'd let me look over your shoulder: get in touch.",
    about: [
      "Lucca Gruber Rodrigues,\n16 years old.",
      "I'm not here to sell you a service. I'm here to understand how a real business actually works – how it's structured, how its parts hand work to each other, the heaviest problems, where the money goes and why the decisions were made this way and not another. From the inside. From people who run one.",
      "I'm available, I'm genuinely strong with technology, and I connect things fast – that's my one real talent – with inexhaustible energy, what I learn on Monday tends to be useful to you by Friday, usually as time, money or effort you (or your team maybe) stop spending. I've built and run a business of my own across two continents; there's a file on it in the drawer.",
      "I'm sixteen and I say it first, before anyone has to point it out. I'm not a professional yet and I'm not going to perform being one. I'll ask obvious questions, and there will be things I get wrong, (completely). What I do have is that I keep my word, I'm direct, I can sit in an uncomfortable conversation without flinching. The rest I want to be taught.",
      "If you run something real – any size – and you'd let me look over your shoulder: get in touch.",
    ],
  },

  pt: {
    tagline:
      "Se você toca algo de verdade – de qualquer tamanho – e me deixaria olhar por cima do seu ombro: me chama.",
    about: [
      "Lucca Gruber Rodrigues,\n16 anos.",
      "Não estou aqui para te vender um serviço. Estou aqui para entender como um negócio de verdade funciona – como ele é estruturado, como as áreas passam trabalho umas para as outras, os problemas mais pesados, para onde vai o dinheiro e por que as decisões foram tomadas assim e não de outro jeito. Por dentro. Com quem toca um.",
      "Tenho disponibilidade, sou realmente forte em tecnologia, e conecto as coisas rápido – esse é o meu único talento de verdade – com energia inesgotável, o que eu aprendo na segunda costuma te ser útil na sexta, normalmente como tempo, dinheiro ou esforço que você (ou o seu time, talvez) deixa de gastar. Já construí e toquei um negócio meu entre dois continentes; tem um arquivo sobre ele na gaveta.",
      "Tenho dezesseis anos e falo isso primeiro, antes que alguém precise apontar. Ainda não sou um profissional e não vou fingir que sou. Vou fazer perguntas óbvias, e vai ter coisa que eu vou errar, (completamente). O que eu tenho é que eu cumpro a minha palavra, sou direto, consigo ficar numa conversa desconfortável sem me abalar. O resto, eu quero que me ensinem.",
      "Se você toca algo de verdade – de qualquer tamanho – e me deixaria olhar por cima do seu ombro: me chama.",
    ],
  },
};
