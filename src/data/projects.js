// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file, not the components.
// Each project has a `summary` (always visible) and a `detail`
// (revealed by the expand toggle on the card).
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: 'Lucca Gruber Rodrigues',
  meta: '16 · Rijswijk, Netherlands',
  tagline: "You have a problem. I can probably solve it.",
}

// The featured project gets its own expanded section.
export const featured = {
  id: 'accul-rebugr',
  label: 'Featured',
  title: 'Accul Rebugr',
  kicker: 'Cross-platform AI project memory — published on the Chrome Web Store',
  link: {
    label: 'View on the Chrome Web Store',
    href: 'https://chromewebstore.google.com/detail/efiokhkpcjkbbfccnfgocflcnkbhjipf',
  },
  problem: [
    'Every time you switch AI platforms — Claude, ChatGPT, Gemini, DeepSeek — your project state resets. You rebuild context from scratch, every session.',
    'Claude and Gemini both launched memory export in early 2026, confirming the demand is real. But both built the same thing: user preference transfer. Knowing who you are doesn’t tell a new AI what you were building, where you got stuck, or what to do next.',
    'Nobody built what the problem actually requires. So I did.',
  ],
  solution:
    'A silent Chrome extension. It captures every AI conversation turn by turn, compresses it into a live project snapshot using an LLM, encrypts it end-to-end, and stores it in the cloud. When you want to continue in a different AI — three clicks. The new AI opens knowing exactly where the project left off.',
  // Expanded layer: the part that's technically hard.
  deepDive: {
    intro:
      'The platforms being captured from are not mine. No API access, no cooperation, no official way to read what happens inside them. So three independent capture methods run simultaneously on every turn, on four platforms with completely different architectures:',
    methods: [
      {
        name: 'API interception',
        detail:
          'Wraps window.fetch (Claude, ChatGPT) and XMLHttpRequest (Gemini, DeepSeek) to intercept the platform’s own network requests, then reconstructs the full AI response from streaming SSE data. Each platform has its own response format — each parser is built specifically for it.',
      },
      {
        name: 'React fiber reading',
        detail:
          'Claude, ChatGPT and DeepSeek are built with React. The extension reads message data directly from React’s internal fiber tree in memory — no network calls, no DOM scraping. Gemini is Angular: three fiber-style approaches failed because Angular strips debug access from production builds, so Gemini is covered by the other two methods.',
      },
      {
        name: 'MutationObserver',
        detail:
          'Watches the conversation DOM for new AI response elements, with platform-specific selectors for each AI. The completion signal is the thumbs-up feedback icon — it only appears once a response has fully finished generating.',
      },
    ],
    failsafe:
      'The first method to succeed sends the turn immediately. A 10-second window stays open — any method that hasn’t reported fires a coded alert via Telegram. Every failure point across every platform and every capture method has its own error code. Nothing fails silently.',
  },
  architecture: [
    {
      name: 'Chrome MV3 extension',
      detail:
        'Two content scripts running simultaneously in different JavaScript contexts — MAIN world for capture, ISOLATED world for routing',
    },
    {
      name: 'Backend',
      detail: 'Node.js on Oracle Cloud (OCI), self-hosted — Docker + Caddy + SSL',
    },
    {
      name: 'Storage',
      detail: 'Supabase — only encrypted blobs, no readable data ever stored',
    },
    {
      name: 'Encryption',
      detail:
        'AES-256-GCM — the key never leaves the OCI server, never reaches the browser, never touches the database. Even the server operator can’t read user data.',
    },
    {
      name: 'Snapshot compression',
      detail: 'LLM-powered via Groq — snapshots fit inside any AI’s context window',
    },
    {
      name: 'Running cost',
      detail: 'Near zero — free-tier models at current scale',
    },
    {
      name: 'Monitoring',
      detail: 'Full error monitoring via Telegram, coded alerts per failure point',
    },
  ],
  status: 'Published on the Chrome Web Store · unlisted · collecting user feedback',
  note: 'The architecture, logic, and product decisions: all mine. Code built with AI assistance.',
}

export const projects = [
  {
    id: 'gruber-goal',
    title: 'Gruber Goal',
    kicker: 'A real business — goalkeeper accessories, run across two continents',
    summary: [
      'Bought the first stock in Brazil in January 2025. Built the brand, logo, website and social media from scratch, made sales. Then moved countries in December 2025 — and rebuilt the entire operation from the Netherlands.',
    ],
    detail: [
      {
        heading: 'The rebuild',
        paras: [
          'Running a Brazilian retail operation from Europe meant rethinking everything. I dropped the website, dropped content creation, and focused only on what converts: Shopee and Mercado Livre. Logistics run through family in Brazil, who handle packaging and dispatch.',
        ],
      },
      {
        heading: 'The operations platform',
        paras: [
          'When the workflow got heavy, I built a custom operations platform in two days — stock, pricing, sales, logistics, the full workflow. Nothing off the shelf; built specifically for this operation.',
          'The pricing tool inside it maps every fee tier across both platforms — weight brackets, category fees, platform cuts — calculated correctly for every possible scenario. When fees change, I update the map. Most small sellers get this wrong and lose margin without knowing it. Pricing is never a problem here.',
        ],
        link: { label: 'Platform demo', href: '#' },
      },
    ],
    tech: ['Custom operations platform', 'Shopee', 'Mercado Livre', 'Cross-border logistics'],
    status: 'Operational — old stock clearing, new stock incoming',
  },
  {
    id: 'shipping-label-automation',
    title: 'Shipping Label Automation',
    kicker: 'Production automation built for Gruber Goal',
    summary: [
      'Tray, the e-commerce platform, had a Melhor Envio shipping panel built in — but orders never reached the actual Melhor Envio account where labels can be generated via API. Tray had no public API. The connection was broken by design, with no official way around it. So I built the way around it.',
    ],
    detail: [
      {
        heading: 'How it works',
        paras: [
          'A paid order is detected via email. Telegram pings me to add the order to the Melhor Envio cart inside Tray, then waits for my confirmation. It checks the account balance: if sufficient, it pays and generates the label automatically; if not, it sends an alert with the exact amount missing and waits until I confirm the top-up.',
          'Once the label is ready, it messages a Telegram group with me and my grandmother in Brazil — the print-ready label, the nearest drop-off point address, and everything she needs to pack and ship.',
          'The human stays in the loop where it matters. The machine handles everything else.',
        ],
      },
      {
        heading: 'What’s next',
        paras: [
          'Gruber Goal now runs on Shopee and Mercado Livre, so I’m rebuilding the same logic for those platforms — my grandmother gets notified the moment something sells, cutting dispatch time and human error.',
        ],
      },
    ],
    tech: ['n8n', 'Melhor Envio API', 'Telegram Bot', 'IMAP email trigger'],
    status: 'In production — being adapted for Shopee & Mercado Livre',
  },
]

export const about = [
  "I'm 16, Brazilian, in the Netherlands since late 2025.",
  "I haven't arrived yet, and I know it. But I'm moving with real discipline toward one specific goal: get to a position where money stops being the constraint and everything after becomes a choice. No career dream, no passion story — just clear direction and consistent movement toward it.",
  "I took a job at Albert Heijn not just for the money, but to understand Dutch systems and culture from the inside. I'm learning Dutch — A2, getting better. When it stops being useful, I'll move.",
  "I work well with people. Not because I'm easy-going, but because I'm secure enough to let someone else be right when they are — and clear enough to say when they're not.",
  "If you're reading this and thinking I might be able to help with something — you're probably right. Get in touch.",
]

export const contact = [
  { label: 'Email', value: 'lucca@example.com', href: 'mailto:lucca@example.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/…', href: 'https://linkedin.com' },
  { label: 'GitHub', value: 'github.com/…', href: 'https://github.com' },
]
