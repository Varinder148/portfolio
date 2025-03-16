import Navigation from "@/Components/Navigation";
import About from "@/Components/Sections/About";

export default function Home() {
  return (
    <div className="snap-y overflow-y-scroll max-h-screen snap-mandatory container">
      <Navigation />
      <About className=" snap-start h-screen" />
      <About className=" snap-start h-screen" />
      <About className=" snap-start h-screen" />
      <About className=" snap-start h-screen" />
    </div>
  );
}
