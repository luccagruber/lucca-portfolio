export type ProjectId = "accul-reburg" | "gruber-goal";

/**
 * A project's visual language. Per the vision it begins only after the
 * folder is opened: these values are applied as CSS custom properties on
 * the project viewer root and are used nowhere else.
 */
export interface ProjectIdentity {
  /** Report page background. */
  background: string;
  /** Primary text on the report. */
  ink: string;
  /** Secondary text. */
  inkSoft: string;
  /** Brand accent — labels, numbers, links. */
  accent: string;
  /** Accent tuned for small text legibility against `background`. */
  accentBright: string;
  /** Hairlines and rules. */
  rule: string;
}

/** One typed slice of a report page. The set is exactly what content needs. */
export type ReportBlock =
  | { kind: "kicker"; text: string }
  | { kind: "title"; text: string }
  | { kind: "lede"; text: string }
  | { kind: "paragraphs"; items: string[] }
  | { kind: "meta"; rows: { term: string; detail: string }[] }
  | { kind: "numbered"; items: { title: string; body: string }[] }
  | { kind: "link"; label: string; href: string }
  /** Small brand mark, used on cover pages. */
  | { kind: "logo"; src: string; alt: string }
  /** One or more photographs/screenshots; two or more render side by side. */
  | { kind: "figures"; items: { src: string; alt: string; caption?: string }[] }
  | { kind: "status"; text: string; note?: string };

export interface ReportPage {
  id: string;
  /** Corporate page header, e.g. "PROBLEM STATEMENT". */
  label: string;
  blocks: ReportBlock[];
}

export interface ProjectReport {
  id: ProjectId;
  /** Human name, e.g. "Accul Reburg". */
  name: string;
  /** Uppercase label printed on the folder tab and report footer. */
  fileLabel: string;
  identity: ProjectIdentity;
  pages: ReportPage[];
}
