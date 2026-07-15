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

function renderBlock(block: ReportBlock, index: number) {
  const key = `${block.kind}-${index}`;
  switch (block.kind) {
    case "kicker":
      return (
        <p
          key={key}
          className="font-mono text-[10px] tracking-[0.22em] uppercase text-(--report-accent-bright)"
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
              <dt className="pt-0.5 font-mono text-[9px] tracking-[0.16em] uppercase text-(--report-accent-bright)">
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
              <span className="pt-0.5 font-mono text-[11px] text-(--report-accent-bright)">
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
            {block.label} ↗
          </a>
        </p>
      );
    case "status":
      return (
        <div key={key} className="rounded-md border border-(--report-rule) p-4">
          <p className="font-mono text-[9px] tracking-[0.22em] text-(--report-accent-bright)">
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
