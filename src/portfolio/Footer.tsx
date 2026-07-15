import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-warm">
      <div className="mx-auto max-w-7xl px-8 py-10 text-[11px] tracking-[0.08em] text-ink-faint">
        <div className="flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="transition-colors hover:text-ink">
            BACK TO TOP ↑
          </a>
        </div>
        <p className="mt-4 text-[10px] leading-relaxed tracking-[0.06em]">
          3D models (CC BY 4.0):{" "}
          <a
            href="https://sketchfab.com/3d-models/office-desk-140x60-9262f311271c4c4390341e526d3fe103"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-ink"
          >
            “Office Desk 140x60” by AleixoAlonso
          </a>
          {" · "}
          <a
            href="https://sketchfab.com/3d-models/macbook-pro-13-inch-2020-efab224280fd4c3993c808107f7c0b38"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-ink"
          >
            “MacBook Pro 13 inch 2020” by timblewee
          </a>
          {" · "}
          <a
            href="https://sketchfab.com/3d-models/glasses-007651a9450746a5b6c5a126d484cd52"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-ink"
          >
            “Glasses” by Marius.Eder
          </a>
          {" · "}
          <a
            href="https://sketchfab.com/3d-models/starbucks-coffee-paper-cup-c34893d7ef90490b8d65d87753aad8ad"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-ink"
          >
            “Starbucks Coffee Paper Cup” by Wittybacon
          </a>
        </p>
      </div>
    </footer>
  );
}
