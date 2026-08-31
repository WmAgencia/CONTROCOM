import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ConsecomTV } from "@/components/ConsecomTV";
import { Compatibility } from "@/components/Compatibility";
import { HowItWorks } from "@/components/HowItWorks";
import { DownloadSection } from "@/components/DownloadSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <ConsecomTV />
      <Compatibility />
      <HowItWorks />
      <DownloadSection />
      <FAQ />
      <Footer />
    </main>
  );
}
