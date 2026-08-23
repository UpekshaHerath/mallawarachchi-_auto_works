import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services, Marquee } from "@/components/Services";
import { Process } from "@/components/Process";
import { Workshop } from "@/components/Workshop";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Location } from "@/components/Location";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Marquee />
        <Process />
        <Workshop />
        <Gallery />
        <Reviews />
        <FAQ />
        <Location />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
      <Reveal />
    </>
  );
}
