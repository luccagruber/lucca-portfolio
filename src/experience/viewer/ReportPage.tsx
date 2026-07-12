import type { ReportBlock, ReportPage as ReportPageData } from "@/content/types";

/**
 * Pure block renderer for one report page. Identity colors arrive as CSS
 * variables set on the viewer root — this component knows no project.
 */
export function ReportPage({ page }: { page: ReportPageData }) {
  return <div className="space-y-6 sm:space-y-7">{page.blocks.map(renderBlock)}</div>;
}

function renderBlock(block: ReportBlock, index: number) {
  const key = `${block.kind}-${index}`;
  switch (block.kind) {
    case "kicker":
      return (
        <p
          key={key}
          className="font-mono text-[11px] tracking-[0.24em] uppercase text-(--report-accent-bright)"
        >
          {block.text}
        </p>
      );
    case "title":
      return (
        <h2 key={key} className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {block.text}
        </h2>
      );
    case "lede":
      return (
        <p key={key} className="max-w-xl text-lg leading-relaxed font-medium sm:text-xl">
          {block.text}
        </p>
      );
    case "paragraphs":
      return (
        <div key={key} className="max-w-xl space-y-4">
          {block.items.map((text, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-(--report-ink-soft) sm:text-base">
              {text}
            </p>
          ))}
        </div>
      );
    case "meta":
      return (
        <dl key={key} className="divide-y divide-(--report-rule) border-y border-(--report-rule)">
          {block.rows.map((row) => (
            <div key={row.term} className="grid grid-cols-[7rem_1fr] gap-4 py-2.5 sm:grid-cols-[8.5rem_1fr]">
              <dt className="pt-0.5 font-mono text-[10px] tracking-[0.18em] uppercase text-(--report-accent-bright)">
                {row.term}
              </dt>
              <dd className="text-sm leading-relaxed text-(--report-ink-soft)">{row.detail}</dd>
            </div>
          ))}
        </dl>
      );
    case "numbered":
      return (
        <ol key={key} className="space-y-5">
          {block.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[2.25rem_1fr]">
              <span className="pt-0.5 font-mono text-xs text-(--report-accent-bright)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-(--report-ink-soft)">{item.body}</p>
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
            className="text-sm font-medium text-(--report-accent-bright) underline decoration-(--report-rule) underline-offset-4 transition-colors hover:text-(--report-ink)"
          >
            {block.label} ↗
          </a>
        </p>
      );
    case "status":
      return (
        <div key={key} className="rounded-md border border-(--report-rule) p-5">
          <p className="font-mono text-[10px] tracking-[0.24em] text-(--report-accent-bright)">STATUS</p>
          <p className="mt-2 leading-relaxed">{block.text}</p>
          {block.note ? (
            <p className="mt-3 text-sm italic text-(--report-ink-soft)">{block.note}</p>
          ) : null}
        </div>
      );
  }
}
