import type { ProjectReport } from "../types";
import { ACCUL_STORE_URL, GRUBER_PLATFORM_URL, acculIdentity, gruberIdentity } from "./identity";

/**
 * The two project files that live in the drawer, in English — exactly two,
 * never more (vision). This file is the original; `pt.ts` is a translation
 * of it and must keep the same pages, in the same order, with the same
 * figures. Change the story here first.
 *
 * Writing rules (agreed with Lucca; revised 2026-07-24 to match the About
 * print's new positioning): each file reads as ONE linear story, short
 * pages, no page that demands effort. The files are not a list of things
 * shipped — they are what the work taught him, with dates, so the speed is
 * visible instead of claimed. Dates come from the real git history.
 * Brazilian platforms are always explained for an international reader,
 * never name-dropped. Photos are pinned next to the exact claim they
 * prove. No skill lists, no age bragging — the work speaks.
 */

const acculReburg: ProjectReport = {
  id: "accul-reburg",
  name: "Accul Reburg",
  fileLabel: "ACCUL REBURG",
  identity: acculIdentity,
  pages: [
    {
      id: "cover",
      label: "PROJECT FILE",
      blocks: [
        { kind: "logo", src: "/images/projects/accul-logo.webp", alt: "Accul Reburg logo" },
        { kind: "kicker", text: "Portable memory for AI conversations" },
        { kind: "title", text: "Accul Reburg" },
        {
          kind: "lede",
          text: "Work inside an AI chat and something valuable builds up: decisions, failed attempts, the exact next step. Switch to another AI — or just open a new chat — and it is gone. You re-explain everything, every time.",
        },
        {
          kind: "link",
          label: "Install it from the Chrome Web Store",
          href: ACCUL_STORE_URL,
        },
        {
          kind: "status",
          text: "Live on the Chrome Web Store — Claude, ChatGPT, Gemini and DeepSeek, in eight languages",
          note: "The idea, architecture, product decisions and infrastructure: all mine. Code built with AI assistance.",
        },
      ],
    },
    {
      id: "capture",
      label: "PRIVACY & THE HARD PART",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Someone's unfinished work is about the most private thing they have, so the extension holds as little of it as it can. Every project lives on the user's own device: no account, nothing to sign up for, an export button that hands the whole thing back, and a delete button that really deletes it.",
            "The only thing that ever leaves the browser is the single turn being summarised. It passes through a server I built and administer myself — a Linux machine running unattended at near-zero cost — which holds the AI key and stores nothing.",
            "Getting that turn is the hard part. None of the four platforms offers a way to read what happens inside them, so each one had to be reverse-engineered — and every turn is captured three independent ways at once:",
          ],
        },
        {
          kind: "numbered",
          items: [
            {
              title: "Network interception",
              body: "Wraps the page's own network layer and rebuilds the response from each platform's private streaming format.",
            },
            {
              title: "React internals",
              body: "Reads message state straight from React's in-memory component tree, and catches the moment a response finishes.",
            },
            {
              title: "DOM observation",
              body: "Watches the conversation on screen, using the platform's own completion signal as the cue.",
            },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "The first method to succeed saves the turn. If all three fail, an alert with a specific error code reaches my phone within ten seconds — the platforms change without warning, and a thing that fails quietly is worse than a thing that doesn't exist.",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/accul-data.webp",
              alt: "Accul Reburg's export, import and delete-all controls",
              caption: "Your projects, on your device — export or delete, any time",
            },
            {
              src: "/images/projects/accul-continue.webp",
              alt: "Accul Reburg continuing a project in another AI",
              caption: "Continuing a project in a different AI — three clicks",
            },
          ],
        },
      ],
    },
    {
      id: "learned",
      label: "FIVE WEEKS",
      blocks: [
        {
          kind: "meta",
          rows: [
            { term: "15 June", detail: "First working version — capture and restore, across four platforms" },
            { term: "28 June", detail: "Capture and error telemetry rebuilt from zero, after the first one failed silently" },
            { term: "11 July", detail: "Rebuilt: the cloud and the accounts out, every project onto the user's own device" },
            { term: "21 July", detail: "The per-user AI key dropped too — my server holds it, so it works on install" },
            { term: "22 July", detail: "Eight languages, rate limiting, and a monitor that tests the extension against itself" },
            { term: "23 July", detail: "Submitted for review" },
            { term: "27 July", detail: "Live on the Chrome Web Store" },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "Most of what changed in those weeks was not code — it was what I thought the product was. For the first month this was a cloud product: an account, and every snapshot encrypted at rest in my database. It worked, and it was still the wrong shape, because the honest answer to holding someone's unfinished work was never to encrypt it better, it was to not hold it at all. The rest I learned on a single morning, when my own project was missing from my own extension and I nearly abandoned it before anyone else could: the three capture methods, the alerts and the self-testing monitor all exist because of that morning.",
          ],
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
      label: "PROJECT FILE",
      blocks: [
        { kind: "logo", src: "/images/projects/gg-logo.webp", alt: "Gruber Goal logo" },
        { kind: "kicker", text: "A real business, run across two continents" },
        { kind: "title", text: "Gruber Goal" },
        {
          kind: "lede",
          text: "A goalkeeper-gear brand I founded in Brazil in January 2025. When I moved to the Netherlands, I didn't shut it down — I rebuilt it to run without me there.",
        },
        {
          kind: "meta",
          rows: [
            { term: "Type", detail: "Physical-product retail — goalkeeper gloves and gear" },
            { term: "Sells on", detail: "Shopee and Mercado Livre, Brazil's dominant marketplaces" },
            { term: "Operated from", detail: "The Hague, Netherlands" },
            { term: "Status", detail: "Operational" },
          ],
        },
      ],
    },
    {
      id: "brazil",
      label: "PART I — BRAZIL",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "January 2025: first stock bought. Around it I built everything a brand needs — the identity, the web store, and a TikTok channel of goalkeeper content that grew to 2,300 followers and 55,000 likes, pulling customers to the store.",
            "Real orders, real customers, five-star reviews: “Everything arrived perfectly — I'll send the site to my goalkeeper friends.”",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/gg-website.webp",
              alt: "The Gruber Goal web store on mobile",
              caption: "The store — brand, copy and campaigns, all mine",
            },
            {
              src: "/images/projects/gg-tiktok.webp",
              alt: "The Gruber Goal TikTok profile",
              caption: "@grubergoal — 55K likes of goalkeeper content",
            },
          ],
        },
      ],
    },
    {
      id: "move",
      label: "PART II — THE MOVE",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "December 2025: I moved to the Netherlands — an ocean away from my own inventory. The business didn't close. It changed shape.",
            "I cut everything that needed me physically present — the website, the daily content — and moved sales to Shopee and Mercado Livre, the marketplaces where Brazilians already buy (Mercado Livre is Latin America's Amazon). Family in Brazil packs and ships. Everything else runs from my desk in The Hague.",
          ],
        },
      ],
    },
    {
      id: "platform",
      label: "PART III — THE PLATFORM",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "A store you can't physically touch has to run on something, so I built that something myself — a platform shaped around my operation rather than around anyone else's: products, purchases, sales, stock and the pricing that tells me what I actually earn.",
          ],
        },
        {
          kind: "link",
          label: "Open a live copy of the platform",
          href: GRUBER_PLATFORM_URL,
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/gg-glove.webp",
              alt: "Gruber Goal professional goalkeeper glove",
              caption: "The product — professional goalkeeper gloves",
            },
          ],
        },
        {
          kind: "status",
          text: "Operational — old stock clearing, new stock incoming",
        },
      ],
    },
  ],
};

export const en: readonly ProjectReport[] = [acculReburg, gruberGoal];
