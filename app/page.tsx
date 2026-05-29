import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Specialization } from "@/components/sections/Specialization";
import { Architecture } from "@/components/sections/Architecture";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Specialization />
        <Architecture />
        <GithubActivity />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
