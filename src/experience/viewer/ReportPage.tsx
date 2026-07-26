import type { ReportBlock, ReportPage as ReportPageData } from "@/content/types";

/**
 * Pure block renderer for one report page. Identity colors arrive as CSS
 * variables set on the viewer root — this component knows no project.
 * Typography: Fraunces (--font-display) for headings, Newsreader
 * (--font-serif) for running text — an editorial pairing that reads like
 * a well-set printed document. Mono survives only as tiny archival
 * stamps (kickers, numbering), part of the file-cabinet aesthetic.
 * Type scale is tuned for the folder's physical page panel (~26rem).
 */
export function ReportPage({ page }: { page: ReportPageData }) {
  return <div className="space-y-4 sm:space-y-5">{page.blocks.map(renderBlock)}</div>;
}

/** Casual pin-board tilts, cycled so neighbouring prints never lean alike. */
const TILTS = ["-rotate-2", "rotate-[1.6deg]", "-rotate-1", "rotate-[2.4deg]"] as const;

function renderBlock(block: ReportBlock, index: number) {
  const key = `${block.kind}-${index}`;
  switch (block.kind) {
    case "kicker":
      return (
        <p
          key={key}
          className="font-sans text-[10px] tracking-[0.22em] uppercase text-(--report-accent-bright)"
        >
          {block.text}
        </p>
      );
    case "title":
      return (
        <h2 key={key} className="font-display text-[26px] font-semibold tracking-tight sm:text-[30px]">
          {block.text}
        </h2>
      );
    case "lede":
      return (
        <p key={key} className="font-serif text-[16.5px] leading-relaxed font-medium sm:text-[17.5px]">
          {block.text}
        </p>
      );
    case "paragraphs":
      return (
        <div key={key} className="space-y-3">
          {block.items.map((text, i) => (
            <p key={i} className="font-serif text-[15px] leading-relaxed text-(--report-ink-soft)">
              {text}
            </p>
          ))}
        </div>
      );
    case "meta":
      return (
        <dl key={key} className="divide-y divide-(--report-rule) border-y border-(--report-rule)">
          {block.rows.map((row) => (
            <div key={row.term} className="grid grid-cols-[6rem_1fr] gap-3 py-2">
              <dt className="pt-0.5 font-sans text-[9px] tracking-[0.16em] uppercase text-(--report-accent-bright)">
                {row.term}
              </dt>
              <dd className="font-serif text-[14px] leading-relaxed text-(--report-ink-soft)">
                {row.detail}
              </dd>
            </div>
          ))}
        </dl>
      );
    case "numbered":
      return (
        <ol key={key} className="space-y-4">
          {block.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[1.9rem_1fr]">
              <span className="pt-0.5 font-sans text-[11px] text-(--report-accent-bright)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[15px] font-semibold">{item.title}</h3>
                <p className="mt-1 font-serif text-[14px] leading-relaxed text-(--report-ink-soft)">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "link":
      return (
        <p key={key}>
          <a
            href={block.href}
            target="_blank"
            rel="noreferrer"
            className="font-serif text-[15px] font-medium text-(--report-accent-bright) underline decoration-(--report-rule) underline-offset-4 transition-colors hover:text-(--report-ink)"
          >
            {/* No trailing arrow — U+2197 renders as an emoji sticker on
                iOS. The underline is the link affordance. */}
            {block.label}
          </a>
        </p>
      );
    case "logo":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={key} src={block.src} alt={block.alt} className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
      );
    case "figures":
      // Photographs live on the page like prints taped into a paper file:
      // white print border, a strip of masking tape, and a casual tilt —
      // never set perfectly straight (user: "tortinho", despojado).
      return (
        <div
          key={key}
          className={`flex flex-wrap items-start justify-center gap-x-6 gap-y-7 pt-3 pb-1`}
        >
          {block.items.map((item, i) => {
            const tilt = TILTS[(index + i) % TILTS.length];
            return (
              <figure
                key={item.src}
                className={`relative min-w-0 bg-white p-1.5 pb-1 shadow-[0_10px_22px_rgba(0,0,0,0.3)] ${tilt} ${
                  block.items.length > 1 ? "w-[calc(50%-1rem)]" : "w-[74%]"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 bg-[rgba(252,246,225,0.72)] shadow-[0_1px_3px_rgba(0,0,0,0.18)] ${
                    (index + i) % 2 ? "rotate-[3deg]" : "rotate-[-4deg]"
                  }`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} loading="lazy" className="w-full object-cover" />
                {item.caption ? (
                  <figcaption className="px-1 pt-1.5 pb-0.5 font-serif text-[11px] leading-snug italic text-neutral-600">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      );
    case "status":
      return (
        <div key={key} className="rounded-md border border-(--report-rule) p-4">
          <p className="font-sans text-[9px] tracking-[0.22em] text-(--report-accent-bright)">
            STATUS
          </p>
          <p className="mt-2 font-serif text-[15px] leading-relaxed">{block.text}</p>
          {block.note ? (
            <p className="mt-2.5 font-serif text-[14px] italic text-(--report-ink-soft)">
              {block.note}
            </p>
          ) : null}
        </div>
      );
  }
}
