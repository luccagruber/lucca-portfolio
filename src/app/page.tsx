import { profile } from "@/content/profile";
import { Experience } from "@/experience/Experience";
import { About } from "@/portfolio/About";
import { Contact } from "@/portfolio/Contact";
import { Footer } from "@/portfolio/Footer";

export default function Home() {
  return (
    <main id="top">
      <h1 className="sr-only">{profile.name} — portfolio</h1>
      <Experience />
      <div className="border-t border-line bg-paper">
        <div className="mx-auto max-w-7xl px-8 py-28 sm:py-36 lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-28">
          <About />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}
