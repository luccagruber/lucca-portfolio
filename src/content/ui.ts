import type { Locale } from "@/lib/locale";

/**
 * Every word the interface says on its own behalf — as opposed to the
 * writing, which lives in `profile.ts` and `projects/`. Small enough to
 * keep in one table, so a missing translation is visible at a glance.
 *
 * Brand names are never in here: Email, WhatsApp, LinkedIn and GitHub read
 * the same in both languages, and translating "Email" to "E-mail" would be
 * a difference nobody needs.
 */
export interface UiStrings {
  /** The one instruction the scene gives. */
  scroll: string;
  /** Under the scroll word, once it is clear people need more. */
  scrollHelp: string;
  /** Printed on the card in the drawer's label holder. */
  drawerLabel: string;
  /** Fixed button, top right. */
  contact: string;
  /** Header on the back of the photograph. */
  about: string;
  /** Report viewer chrome. */
  page: string;
  pages: string;
  file: string;
  next: string;
  prev: string;
  closeProject: string;
  closeAbout: string;
  /** The keyboard/screen-reader path through the canvas. */
  a11yTurnPhoto: string;
  a11yOpenDrawer: string;
  a11yOpenFile: string;
  a11yDrawerOpen: string;
  /** Accessible landmark names. */
  workspaceLabel: string;
  contactLabel: string;
  language: string;
  /** Footer. */
  colophon: string;
  noTemplates: string;
  sourceOnGitHub: string;
  backToTop: string;
  models: string;
  /** No-JS fallback. */
  projects: string;
  enableJs: string;
}

export const ui: Record<Locale, UiStrings> = {
  en: {
    scroll: "SCROLL",
    scrollHelp: "to open the drawer",
    drawerLabel: "PROJECTS",
    contact: "Contact",
    about: "ABOUT",
    page: "PAGE",
    pages: "PAGES",
    file: "FILE",
    next: "NEXT",
    prev: "PREV",
    closeProject: "Close project file",
    closeAbout: "Close about",
    a11yTurnPhoto: "Turn over the photograph: about Lucca",
    a11yOpenDrawer: "Open the projects drawer",
    a11yOpenFile: "Open project file:",
    a11yDrawerOpen: "Projects drawer open. Two project files available.",
    workspaceLabel: "Workspace — the project files",
    contactLabel: "Contact",
    language: "Language",
    colophon: "This site is a project too — designed and built from zero by",
    noTemplates: "No templates.",
    sourceOnGitHub: "Source on GitHub",
    backToTop: "BACK TO TOP",
    models: "3D models (CC BY 4.0):",
    projects: "Projects",
    enableJs: "Enable JavaScript for the interactive workspace.",
  },

  pt: {
    scroll: "ROLE",
    scrollHelp: "para abrir a gaveta",
    drawerLabel: "PROJETOS",
    contact: "Contato",
    about: "SOBRE",
    page: "PÁGINA",
    pages: "PÁGINAS",
    file: "ARQUIVO",
    next: "PRÓXIMA",
    prev: "ANTERIOR",
    closeProject: "Fechar arquivo do projeto",
    closeAbout: "Fechar sobre",
    a11yTurnPhoto: "Virar a fotografia: sobre o Lucca",
    a11yOpenDrawer: "Abrir a gaveta de projetos",
    a11yOpenFile: "Abrir arquivo do projeto:",
    a11yDrawerOpen: "Gaveta de projetos aberta. Dois arquivos disponíveis.",
    workspaceLabel: "Mesa de trabalho — os arquivos dos projetos",
    contactLabel: "Contato",
    language: "Idioma",
    colophon: "Este site também é um projeto — desenhado e construído do zero por",
    noTemplates: "Sem templates.",
    sourceOnGitHub: "Código no GitHub",
    backToTop: "VOLTAR AO TOPO",
    models: "Modelos 3D (CC BY 4.0):",
    projects: "Projetos",
    enableJs: "Ative o JavaScript para a experiência interativa.",
  },
};
