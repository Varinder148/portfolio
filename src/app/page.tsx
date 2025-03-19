import Navigation from "@/Components/Navigation";
import About from "@/Components/Sections/About";
import Education from "@/Components/Sections/Education";
import Experience from "@/Components/Sections/Experience";
import Skills from "@/Components/Sections/Skills";

export default function Home() {
  return (
    <div className=" ">
      <Navigation />
      <About />
      <Experience />
      <Skills />
      <Education />
    </div>
  );
}
