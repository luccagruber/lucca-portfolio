import type { ProjectReport } from "../types";
import { GRUBER_PLATFORM_URL, acculIdentity, gruberIdentity } from "./identity";

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
          text: "A Chrome extension that lets a project continue in any AI, exactly where it left off. First working version: 15 June 2026. Five weeks later it had been rebuilt once from the ground up — from a cloud product into an on-device one — and shipped in eight languages with a monitor that tells me when it breaks.",
        },
        {
          kind: "meta",
          rows: [
            { term: "What it is", detail: "Chrome extension; projects stay on your own device" },
            { term: "Works on", detail: "Claude · ChatGPT · Gemini · DeepSeek" },
            { term: "Runs on", detail: "A server I built and administer, which holds the AI key" },
            { term: "Status", detail: "Submitted to the Chrome Web Store, awaiting review" },
          ],
        },
      ],
    },
    {
      id: "problem",
      label: "THE PROBLEM",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Work inside an AI chat and something valuable builds up: decisions, failed attempts, the exact next step. Switch to another AI — or just open a new chat — and it is gone. You re-explain everything, every time.",
            "Claude and Gemini shipped memory export in early 2026, which proves the demand. But what they transfer is who you are — not what you were building.",
          ],
        },
        {
          kind: "lede",
          text: "Nobody had built the real thing. So I did.",
        },
      ],
    },
    {
      id: "capture",
      label: "THE HARD PART",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "None of the four platforms offers a way to read what happens inside them. Each one had to be reverse-engineered — and every turn is captured three independent ways at once:",
          ],
        },
        {
          kind: "numbered",
          items: [
            {
              title: "Network interception",
              body: "Wraps the page's own network layer and rebuilds the full AI response from each platform's private streaming format.",
            },
            {
              title: "React internals",
              body: "Reads message state straight from React's in-memory component tree — and catches the exact moment a response finishes.",
            },
            {
              title: "DOM observation",
              body: "Watches the conversation on screen, using each platform's own completion signal as the cue.",
            },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "The first method to succeed saves the turn. If all three fail, an alert with a specific error code reaches my phone within ten seconds — because the platforms change without warning, and a thing that fails quietly is worse than a thing that doesn't exist.",
            "People's conversations are sensitive, so the extension holds as little of them as it can: every project lives on the user's own device, with no account and nothing to sign up for. The only thing that ever leaves the browser is the single turn being summarised, and it passes through a server I built and administer myself — a Linux machine running unattended at near-zero cost — which holds the AI key and stores nothing.",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/accul-continue.webp",
              alt: "Accul Reburg continuing a project in another AI",
              caption: "Continuing a project in a different AI — three clicks",
            },
            {
              src: "/images/projects/accul-onboarding.webp",
              alt: "Accul Reburg first-run privacy terms",
              caption: "First run — what is processed, what is stored, what you control",
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
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "Most of what changed in those weeks was not code. It was what I thought the product was.",
            "The biggest rebuild was invisible. For the first month this was a cloud product: you made an account, and every snapshot sat encrypted at rest in my database. It worked. It was also the wrong shape — someone's unfinished work is about the most private thing they have, and the honest answer was not to encrypt it better, it was to never hold it. On 11 July I moved every project onto the user's own device. My first version of that asked each person for their own AI key; I dropped it ten days later, because it was a wall in front of something that should just work. My server holds the key now and sees only the one turn it is summarising.",
            "I gave it to someone who compared it to copy-paste — then said it was far faster than copy-paste, and that it caught things copy-paste can't. He also said the price was too high for where he lives, and told me to stop selling continuity. He was right. What the extension actually keeps is the state of the work: the decisions, the constraints, the next step. That is worth something anywhere it currently can't travel — between tools, between agents, between two people handing a project over.",
            "The second lesson was about me. One morning my own project was missing from the extension, and I nearly abandoned my own product before anyone else could. Almost everything built after that — the three capture methods, the alerts, the self-testing monitor — exists because of that morning.",
          ],
        },
        {
          kind: "status",
          text: "Submitted to the Chrome Web Store — awaiting review",
          note: "The idea, architecture, product decisions and infrastructure: all mine. Code built with AI assistance.",
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
      label: "PART III — THE NUMBERS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "A store you can't physically touch has to run on something, so I built the platform that holds the whole business: products, purchases, sales, stock, pricing.",
            "Its pricing engine maps every fee tier on both marketplaces — commissions, category rates, weight brackets — and returns the exact break-even and the true profit for any price. That was the thing worth learning: the number I had been treating as profit wasn't one. The business was leaking margin in a place that stayed invisible until it was computed. Most small sellers guess that math; a lot of them are losing money on their best-selling item and don't know it.",
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
