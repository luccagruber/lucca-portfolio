import type { ProjectId, ProjectReport } from "./types";

/**
 * The two project files that live in the drawer — exactly two, never more
 * (vision). All project copy is edited here, nowhere else.
 *
 * Writing rules (agreed with Lucca, 2026-07-16): each file reads as ONE
 * linear story, short pages, no page that demands effort. Brazilian
 * platforms are always explained for an international reader, never
 * name-dropped. Photos are post-it prints pinned next to the exact claim
 * they prove. No skill lists, no age bragging — the work speaks.
 */

const acculReburg: ProjectReport = {
  id: "accul-reburg",
  name: "Accul Reburg",
  fileLabel: "ACCUL REBURG",
  identity: {
    background: "#0B0B0B",
    ink: "#EAE8E1",
    inkSoft: "#9C9A92",
    accent: "#4A6741",
    accentBright: "#8FAF83",
    rule: "#242622",
  },
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
          text: "A Chrome extension that lets a project continue in any AI, exactly where it left off. Built from zero, published, and running — by one person.",
        },
        {
          kind: "meta",
          rows: [
            { term: "What it is", detail: "Chrome extension + my own backend and encrypted storage" },
            { term: "Works on", detail: "Claude · ChatGPT · Gemini · DeepSeek" },
            { term: "Status", detail: "Live on the Chrome Web Store, real users testing" },
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
      id: "solution",
      label: "HOW IT WORKS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Install it once and use AI normally — nothing is asked of you. The extension captures every conversation turn silently, an LLM compresses it into a living snapshot of the project, and the snapshot is stored encrypted in the cloud.",
            "Ready to switch? Open the extension, pick the project, click continue. The new AI starts already knowing where you left off.",
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
          ],
        },
        {
          kind: "link",
          label: "View on the Chrome Web Store",
          href: "https://chromewebstore.google.com/detail/efiokhkpcjkbbfccnfgocflcnkbhjipf",
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
            "None of the four platforms offers a way to read what happens inside them. Each one had to be reverse-engineered — and is captured three independent ways at once, on every turn:",
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
            "The first method to succeed saves the turn. If any method breaks silently, an alert with a specific error code reaches my phone within ten seconds. The platforms change without warning — the system is built to be maintained, not just deployed.",
          ],
        },
      ],
    },
    {
      id: "security",
      label: "SECURITY",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "People's conversations are sensitive, so the system is designed so that not even I can read them. Every snapshot is encrypted before it is stored; the key exists only on my server — never in the browser, never in the database.",
            "That server is mine too: a Linux machine I administer myself, running Docker behind automatic HTTPS, monitoring and restarting itself. It runs unattended, at near-zero cost.",
          ],
        },
        {
          kind: "figures",
          items: [
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
      id: "status",
      label: "STATUS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Live, with a structured early-user testing program: real users, recorded feedback sessions, and a roadmap shaped by what they say. That feedback is already widening the idea — from AI-to-AI continuity toward making work context portable anywhere it needs to go.",
          ],
        },
        {
          kind: "status",
          text: "Live on the Chrome Web Store · in active development",
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
  identity: {
    background: "#F5F5F5",
    ink: "#00303F",
    inkSoft: "#4A6572",
    accent: "#A93226",
    accentBright: "#A93226",
    rule: "#D9DCDD",
  },
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
      id: "systems",
      label: "PART III — THE SYSTEMS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "A store you can't physically touch has to run on systems, so I built two.",
            "The operations platform holds the whole business — products, purchases, sales, stock, pricing, finances. Its pricing engine maps every fee tier on both marketplaces (commissions, category rates, weight brackets) and returns the exact break-even and true profit for any price. Most small sellers guess that math and quietly lose margin; here it is computed.",
          ],
        },
        {
          kind: "link",
          label: "Open the operations platform",
          href: "#",
        },
        {
          kind: "paragraphs",
          items: [
            "The shipping robot exists because the store's platform and Brazil's shipping broker — their version of Sendcloud — were supposed to connect and didn't, with no official fix. Mine watches for the payment-confirmation email, pays and generates the label through the broker's API, and drops everything into a Telegram group with my grandmother: the label to print, the nearest drop-off point, one button to confirm dispatch. If the shipping balance is short, it reports the exact missing amount, waits for the top-up, and resumes on its own.",
          ],
        },
        {
          kind: "meta",
          rows: [
            { term: "Built with", detail: "n8n · shipping API · Telegram bots · email triggers" },
            { term: "Runs on", detail: "My own self-hosted cloud server — ~€0/month" },
          ],
        },
      ],
    },
    {
      id: "status",
      label: "STATUS & NEXT",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The same robot is now being rebuilt for the marketplaces — so the moment something sells, Brazil knows, with everything needed to ship it.",
          ],
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

/** Drawer order: front file first. */
export const projectReports: readonly ProjectReport[] = [acculReburg, gruberGoal];

export function reportById(id: ProjectId): ProjectReport {
  const report = projectReports.find((r) => r.id === id);
  if (!report) throw new Error(`Unknown project id: ${id}`);
  return report;
}
