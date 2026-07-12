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
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
