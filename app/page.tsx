import Header from "@/components/Header";
import ProgressRail from "@/components/ui/ProgressRail";
import Hero from "@/components/hero/Hero";
import Origin from "@/components/sections/Origin";
import Craft from "@/components/sections/Craft";
import Process from "@/components/sections/Process";
import Proof from "@/components/sections/Proof";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressRail />
      <main className="relative">
        <Hero />
        <Origin />
        <Craft />
        <Process />
        <Proof />
        <Contact />
      </main>
    </>
  );
}
