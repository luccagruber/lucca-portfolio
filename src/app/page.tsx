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
        <div className="mx-auto max-w-2xl px-6 py-24 sm:py-32 lg:max-w-4xl lg:grid lg:grid-cols-2 lg:gap-20">
          <About />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}
