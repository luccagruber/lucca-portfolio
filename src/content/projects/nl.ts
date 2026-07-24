import type { ProjectReport } from "../types";
import { GRUBER_PLATFORM_URL, acculIdentity, gruberIdentity } from "./identity";

/**
 * The two project files in Dutch — a translation of `en.ts`, page for page.
 * Same rules: one linear story, short pages, dates from the real git
 * history, and the lesson rather than the feature. Shopee and Mercado Livre
 * keep their short gloss here, as in English: a Dutch reader has no reason
 * to know what they are.
 */

const acculReburg: ProjectReport = {
  id: "accul-reburg",
  name: "Accul Reburg",
  fileLabel: "ACCUL REBURG",
  identity: acculIdentity,
  pages: [
    {
      id: "cover",
      label: "PROJECTDOSSIER",
      blocks: [
        { kind: "logo", src: "/images/projects/accul-logo.webp", alt: "Logo van Accul Reburg" },
        { kind: "kicker", text: "Draagbaar geheugen voor AI-gesprekken" },
        { kind: "title", text: "Accul Reburg" },
        {
          kind: "lede",
          text: "Een Chrome-extensie waarmee een project in elke AI verdergaat, precies waar het gebleven was. Eerste werkende versie: 15 juni 2026. Vijf weken later had het een eigen backend, versleutelde opslag, acht talen en een monitor die me waarschuwt zodra er iets breekt.",
        },
        {
          kind: "meta",
          rows: [
            { term: "Wat het is", detail: "Chrome-extensie + mijn eigen backend en versleutelde opslag" },
            { term: "Werkt op", detail: "Claude · ChatGPT · Gemini · DeepSeek" },
            { term: "Status", detail: "Ingediend bij de Chrome Web Store, wacht op beoordeling" },
          ],
        },
      ],
    },
    {
      id: "problem",
      label: "HET PROBLEEM",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Je werkt in een AI-gesprek en er bouwt zich iets waardevols op: beslissingen, mislukte pogingen, de precieze volgende stap. Stap over naar een andere AI — of open gewoon een nieuw gesprek — en het is weg. Je legt alles opnieuw uit, elke keer.",
            "Claude en Gemini brachten begin 2026 geheugenexport uit, wat bewijst dat de vraag er is. Maar wat zij meenemen is wie je bent — niet waar je aan werkte.",
          ],
        },
        {
          kind: "lede",
          text: "Niemand had het echte ding gebouwd. Dus deed ik het.",
        },
      ],
    },
    {
      id: "capture",
      label: "HET MOEILIJKE DEEL",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Geen van de vier platformen biedt een manier om te lezen wat er binnenin gebeurt. Elk platform moest via reverse engineering ontrafeld worden — en elke beurt in het gesprek wordt op drie onafhankelijke manieren tegelijk vastgelegd:",
          ],
        },
        {
          kind: "numbered",
          items: [
            {
              title: "Netwerkonderschepping",
              body: "Legt zich om de netwerklaag van de pagina heen en bouwt het volledige AI-antwoord opnieuw op uit het eigen streamingformaat van elk platform.",
            },
            {
              title: "React-internals",
              body: "Leest de berichtstatus rechtstreeks uit React's componentenboom in het geheugen — en vangt het exacte moment waarop een antwoord klaar is.",
            },
            {
              title: "DOM-observatie",
              body: "Volgt het gesprek op het scherm en gebruikt het voltooiingssignaal van het platform zelf als teken.",
            },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "De eerste methode die slaagt, bewaart de beurt. Falen alle drie, dan komt er binnen tien seconden een melding met een specifieke foutcode op mijn telefoon — want de platformen veranderen zonder waarschuwing, en iets dat stil faalt is erger dan iets dat niet bestaat.",
            "Gesprekken van mensen zijn gevoelig, dus het systeem is zo gebouwd dat zelfs ik ze niet kan lezen. Elke momentopname wordt versleuteld vóór opslag; de sleutel bestaat alleen op mijn server — een Linux-machine die ik zelf beheer, die onbeheerd draait tegen bijna nul kosten.",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/accul-continue.webp",
              alt: "Accul Reburg zet een project voort in een andere AI",
              caption: "Een project voortzetten in een andere AI — drie klikken",
            },
            {
              src: "/images/projects/accul-onboarding.webp",
              alt: "Privacyvoorwaarden van Accul Reburg bij de eerste start",
              caption: "Eerste start — wat er verwerkt wordt, wat er bewaard wordt, wat jij bepaalt",
            },
          ],
        },
      ],
    },
    {
      id: "learned",
      label: "VIJF WEKEN",
      blocks: [
        {
          kind: "meta",
          rows: [
            { term: "15 juni", detail: "Eerste werkende versie — vastleggen en herstellen, op vier platformen" },
            { term: "28 juni", detail: "Vastleggen en fouttelemetrie vanaf nul herbouwd, nadat de eerste versie stil faalde" },
            { term: "11 juli", detail: "Opslag verhuisd naar het apparaat zelf; de snapshot-prompt geschreven" },
            { term: "21 juli", detail: "API-sleutel per gebruiker geschrapt — momentopnames lopen nu versleuteld via mijn eigen server" },
            { term: "22 juli", detail: "Acht talen, rate limiting, en een monitor die de extensie tegen zichzelf test" },
            { term: "23 juli", detail: "Ingediend voor beoordeling" },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "Het meeste dat in die weken veranderde was geen code. Het was wat ik dacht dat het product was.",
            "Ik gaf het aan iemand die het vergeleek met kopiëren en plakken — en toen zei dat het veel sneller was dan kopiëren en plakken, en dingen meenam die kopiëren en plakken niet meekrijgt. Hij zei ook dat de prijs te hoog was voor waar hij woont, en dat ik moest stoppen met continuïteit verkopen. Hij had gelijk. Wat de extensie echt bewaart is de stand van het werk: de beslissingen, de beperkingen, de volgende stap. En dat is overal iets waard waar die stand vandaag niet mee kan reizen — tussen tools, tussen agents, tussen twee mensen die een project overdragen.",
            "De tweede les ging over mijzelf. Op een ochtend was mijn eigen project verdwenen uit de extensie, en ik gaf mijn eigen product bijna op vóór iemand anders dat kon doen. Bijna alles wat daarna gebouwd is — de drie vastlegmethodes, de meldingen, de monitor die zichzelf test — bestaat door die ochtend.",
          ],
        },
        {
          kind: "status",
          text: "Ingediend bij de Chrome Web Store — wacht op beoordeling",
          note: "Het idee, de architectuur, de productbeslissingen en de infrastructuur: allemaal van mij. Code gebouwd met hulp van AI.",
        },
      ],
    },
  ],
};

const gruberGoal: ProjectReport = {
  id: "gruber-goal",
  name: "Gruber Goal",
  fileLabel: "GRUBER GOAL",
  identity: gruberIdentity,
  pages: [
    {
      id: "cover",
      label: "PROJECTDOSSIER",
      blocks: [
        { kind: "logo", src: "/images/projects/gg-logo.webp", alt: "Logo van Gruber Goal" },
        { kind: "kicker", text: "Een echt bedrijf, gerund over twee continenten" },
        { kind: "title", text: "Gruber Goal" },
        {
          kind: "lede",
          text: "Een merk in keepersspullen dat ik in januari 2025 in Brazilië oprichtte. Toen ik naar Nederland verhuisde, heb ik het niet gesloten — ik heb het herbouwd zodat het draait zonder dat ik er ben.",
        },
        {
          kind: "meta",
          rows: [
            { term: "Type", detail: "Retail in fysieke producten — keepershandschoenen en -spullen" },
            { term: "Verkoopt op", detail: "Shopee en Mercado Livre, de grootste marktplaatsen van Brazilië" },
            { term: "Aangestuurd vanuit", detail: "Den Haag, Nederland" },
            { term: "Status", detail: "Operationeel" },
          ],
        },
      ],
    },
    {
      id: "brazil",
      label: "DEEL I — BRAZILIË",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Januari 2025: eerste voorraad gekocht. Daaromheen bouwde ik alles wat een merk nodig heeft — de identiteit, de webshop, en een TikTok-kanaal met keeperscontent dat groeide naar 2.300 volgers en 55.000 likes, en klanten naar de winkel trok.",
            "Echte bestellingen, echte klanten, vijf sterren: “Alles kwam perfect aan — ik stuur de site door naar mijn keepersvrienden.”",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/gg-website.webp",
              alt: "De webshop van Gruber Goal op mobiel",
              caption: "De winkel — merk, teksten en campagnes, allemaal van mij",
            },
            {
              src: "/images/projects/gg-tiktok.webp",
              alt: "Het TikTok-profiel van Gruber Goal",
              caption: "@grubergoal — 55K likes aan keeperscontent",
            },
          ],
        },
      ],
    },
    {
      id: "move",
      label: "DEEL II — DE VERHUIZING",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "December 2025: ik verhuisde naar Nederland — een oceaan verwijderd van mijn eigen voorraad. Het bedrijf ging niet dicht. Het veranderde van vorm.",
            "Ik schrapte alles waarvoor ik fysiek aanwezig moest zijn — de website, de dagelijkse content — en verplaatste de verkoop naar Shopee en Mercado Livre, de marktplaatsen waar Brazilianen toch al kopen (Mercado Livre is de Amazon van Latijns-Amerika). Familie in Brazilië pakt in en verstuurt. Al het andere draait vanaf mijn bureau in Den Haag.",
          ],
        },
      ],
    },
    {
      id: "platform",
      label: "DEEL III — DE CIJFERS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Een winkel die je niet fysiek kunt aanraken moet ergens op draaien, dus bouwde ik het platform dat het hele bedrijf vasthoudt: producten, inkopen, verkopen, voorraad, prijsstelling.",
            "De prijsmotor brengt elke tarieftrap van beide marktplaatsen in kaart — commissies, categorietarieven, gewichtsklassen — en geeft het exacte break-evenpunt en de echte winst voor elke prijs. Dát was het waard om te leren: het getal dat ik als winst behandelde, was geen winst. Het bedrijf lekte marge op een plek die onzichtbaar bleef totdat ze werd uitgerekend. De meeste kleine verkopers gokken die som; een flink deel van hen verliest geld op hun bestverkopende product zonder het te weten.",
          ],
        },
        {
          kind: "link",
          label: "Open een live kopie van het platform",
          href: GRUBER_PLATFORM_URL,
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/gg-glove.webp",
              alt: "Professionele keepershandschoen van Gruber Goal",
              caption: "Het product — professionele keepershandschoenen",
            },
          ],
        },
        {
          kind: "status",
          text: "Operationeel — oude voorraad loopt af, nieuwe voorraad onderweg",
        },
      ],
    },
  ],
};

export const nl: readonly ProjectReport[] = [acculReburg, gruberGoal];
