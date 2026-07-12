import type { ProjectId, ProjectReport } from "./types";

/**
 * The two project files that live in the cabinet — exactly two, never more
 * (vision). All project copy is edited here, nowhere else.
 *
 * The Shipping Label Automation work is presented as a chapter of the
 * Gruber Goal file: it was built for that operation and reads strongest as
 * part of that story.
 */

const acculRebugr: ProjectReport = {
  id: "accul-rebugr",
  name: "Accul Rebugr",
  fileLabel: "ACCUL REBUGR",
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
        { kind: "kicker", text: "Cross-platform AI project memory" },
        { kind: "title", text: "Accul Rebugr" },
        {
          kind: "lede",
          text: "A silent Chrome extension that lets a project continue in any AI, exactly where it left off.",
        },
        {
          kind: "meta",
          rows: [
            { term: "Category", detail: "Chrome extension · MV3" },
            { term: "Platforms", detail: "Claude · ChatGPT · Gemini · DeepSeek" },
            { term: "Distribution", detail: "Chrome Web Store (unlisted)" },
            { term: "Status", detail: "Published · collecting user feedback" },
          ],
        },
      ],
    },
    {
      id: "problem",
      label: "PROBLEM STATEMENT",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Every time you switch AI platforms — Claude, ChatGPT, Gemini, DeepSeek — your project state resets. You rebuild context from scratch, every session.",
            "Claude and Gemini both launched memory export in early 2026, confirming the demand is real. But both built the same thing: user preference transfer. Knowing who you are doesn't tell a new AI what you were building, where you got stuck, or what to do next.",
          ],
        },
        {
          kind: "lede",
          text: "Nobody built what the problem actually requires. So I did.",
        },
      ],
    },
    {
      id: "solution",
      label: "SOLUTION",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "A silent Chrome extension. It captures every AI conversation turn by turn, compresses it into a live project snapshot using an LLM, encrypts it end-to-end, and stores it in the cloud.",
            "When you want to continue in a different AI — three clicks. The new AI opens knowing exactly where the project left off.",
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
      label: "CAPTURE ARCHITECTURE",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The platforms being captured from are not mine. No API access, no cooperation, no official way to read what happens inside them. So three independent capture methods run simultaneously on every turn, on four platforms with completely different architectures:",
          ],
        },
        {
          kind: "numbered",
          items: [
            {
              title: "API interception",
              body: "Wraps window.fetch (Claude, ChatGPT) and XMLHttpRequest (Gemini, DeepSeek) to intercept the platform's own network requests, then reconstructs the full AI response from streaming SSE data. Each platform has its own response format — each parser is built specifically for it.",
            },
            {
              title: "React fiber reading",
              body: "Claude, ChatGPT and DeepSeek are built with React. The extension reads message data directly from React's internal fiber tree in memory — no network calls, no DOM scraping. Gemini is Angular and strips debug access from production builds, so it is covered by the other two methods.",
            },
            {
              title: "MutationObserver",
              body: "Watches the conversation DOM for new AI response elements, with platform-specific selectors for each AI. The completion signal is the thumbs-up feedback icon — it only appears once a response has fully finished generating.",
            },
          ],
        },
      ],
    },
    {
      id: "failsafe",
      label: "FAIL-SAFES",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The first method to succeed sends the turn immediately. A 10-second window stays open — any method that hasn't reported fires a coded alert via Telegram.",
            "Every failure point across every platform and every capture method has its own error code. Nothing fails silently.",
          ],
        },
        {
          kind: "meta",
          rows: [
            { term: "Monitoring", detail: "Telegram alerts, coded per failure point" },
            { term: "Failure budget", detail: "10s reporting window per capture method" },
          ],
        },
      ],
    },
    {
      id: "architecture",
      label: "SYSTEM ARCHITECTURE",
      blocks: [
        {
          kind: "meta",
          rows: [
            {
              term: "Extension",
              detail: "Chrome MV3 — two content scripts in different JavaScript contexts: MAIN world for capture, ISOLATED world for routing",
            },
            { term: "Backend", detail: "Node.js on Oracle Cloud (OCI), self-hosted — Docker + Caddy + SSL" },
            { term: "Storage", detail: "Supabase — only encrypted blobs, no readable data ever stored" },
            {
              term: "Encryption",
              detail: "AES-256-GCM — the key never leaves the OCI server, never reaches the browser, never touches the database",
            },
            { term: "Compression", detail: "LLM-powered via Groq — snapshots fit any AI's context window" },
            { term: "Running cost", detail: "Near zero — free-tier models at current scale" },
          ],
        },
      ],
    },
    {
      id: "status",
      label: "STATUS",
      blocks: [
        {
          kind: "status",
          text: "Published on the Chrome Web Store · unlisted · collecting user feedback",
          note: "The architecture, logic, and product decisions: all mine. Code built with AI assistance.",
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
        { kind: "kicker", text: "A real business — goalkeeper accessories" },
        { kind: "title", text: "Gruber Goal" },
        {
          kind: "lede",
          text: "Founded in Brazil, rebuilt from the Netherlands — a retail operation run across two continents.",
        },
        {
          kind: "meta",
          rows: [
            { term: "Type", detail: "Physical-product retail" },
            { term: "Markets", detail: "Shopee · Mercado Livre (Brazil)" },
            { term: "Operated from", detail: "Rijswijk, Netherlands" },
            { term: "Status", detail: "Operational" },
          ],
        },
      ],
    },
    {
      id: "business",
      label: "THE BUSINESS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Bought the first stock in Brazil in January 2025. Built the brand, logo, website and social media from scratch, made sales. Then moved countries in December 2025 — and rebuilt the entire operation from the Netherlands.",
            "Running a Brazilian retail operation from Europe meant rethinking everything. I dropped the website, dropped content creation, and focused only on what converts: Shopee and Mercado Livre. Logistics run through family in Brazil, who handle packaging and dispatch.",
          ],
        },
      ],
    },
    {
      id: "platform",
      label: "OPERATIONS PLATFORM",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "When the workflow got heavy, I built a custom operations platform in two days — stock, pricing, sales, logistics, the full workflow. Nothing off the shelf; built specifically for this operation.",
            "The pricing tool inside it maps every fee tier across both platforms — weight brackets, category fees, platform cuts — calculated correctly for every possible scenario. When fees change, I update the map. Most small sellers get this wrong and lose margin without knowing it. Pricing is never a problem here.",
          ],
        },
      ],
    },
    {
      id: "automation",
      label: "SHIPPING AUTOMATION",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Tray, the e-commerce platform, had a Melhor Envio shipping panel built in — but orders never reached the actual Melhor Envio account where labels can be generated via API. Tray had no public API. The connection was broken by design, with no official way around it. So I built the way around it.",
            "A paid order is detected via email. Telegram pings me to add the order to the Melhor Envio cart, then waits for my confirmation. It checks the account balance: if sufficient, it pays and generates the label automatically; if not, it alerts with the exact amount missing and waits for the top-up.",
            "Once the label is ready, it messages a Telegram group with me and my grandmother in Brazil — the print-ready label, the nearest drop-off point, and everything she needs to pack and ship. The human stays in the loop where it matters. The machine handles everything else.",
          ],
        },
        {
          kind: "meta",
          rows: [
            { term: "Stack", detail: "n8n · Melhor Envio API · Telegram Bot · IMAP trigger" },
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
            "Gruber Goal now runs on Shopee and Mercado Livre, so the same automation logic is being rebuilt for those platforms — my grandmother gets notified the moment something sells, cutting dispatch time and human error.",
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
export const projectReports: readonly ProjectReport[] = [acculRebugr, gruberGoal];

export function reportById(id: ProjectId): ProjectReport {
  const report = projectReports.find((r) => r.id === id);
  if (!report) throw new Error(`Unknown project id: ${id}`);
  return report;
}
