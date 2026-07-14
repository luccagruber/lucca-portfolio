import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-8 font-mono text-[11px] tracking-[0.14em] text-ink-faint">
        <div className="flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="transition-colors hover:text-ink">
            BACK TO TOP ↑
          </a>
        </div>
        <p className="mt-3 text-[9px] tracking-[0.12em]">
          DESK MODEL:{" "}
          <a
            href="https://sketchfab.com/3d-models/office-desk-140x60-9262f311271c4c4390341e526d3fe103"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-ink"
          >
            “OFFICE DESK 140X60” BY ALEIXOALONSO
          </a>{" "}
          · CC BY 4.0
        </p>
      </div>
    </footer>
  );
}
