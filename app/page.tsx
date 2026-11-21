import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Grow from "@/components/Grow";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Grow />
        <Work />
        <Experience />
        <Services />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
