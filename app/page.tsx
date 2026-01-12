import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden" >
      <NavBar /> 
      <Hero />
      {/* <section className="z-0 min-h-screen bg-blue-300"></section> */}
      <About />
      <Features />
    </main>
  );
}
