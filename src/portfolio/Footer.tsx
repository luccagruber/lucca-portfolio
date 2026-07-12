import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8 font-mono text-[11px] tracking-[0.14em] text-ink-faint">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top" className="transition-colors hover:text-ink">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
