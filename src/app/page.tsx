"use client";

import Navigation from "@/Components/Navigation";
import menuItems, { refs } from "@/Components/Navigation/constants";
import About from "@/Components/Sections/About";
import Education from "@/Components/Sections/Education";
import Experience from "@/Components/Sections/Experience";
import Skills from "@/Components/Sections/Skills";
import { useRef } from "react";

export default function Home() {
  const anchorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    [refs.About]: null,
    [refs.Experience]: null,
    [refs.Education]: null,
    [refs.Skills]: null,
  });

  return (
    <div className=" ">
      <Navigation refs={anchorRefs} />
      <div
        ref={(ref) => {
          anchorRefs.current[refs.About] = ref;
        }}
      >
        <About />
      </div>
      <div
        ref={(ref) => {
          anchorRefs.current[refs.Experience] = ref;
        }}
      >
        <Experience />
      </div>
      <div
        ref={(ref) => {
          anchorRefs.current[refs.Skills] = ref;
        }}
      >
        <Skills />
      </div>
      <div
        ref={(ref) => {
          anchorRefs.current[refs.Education] = ref;
        }}
      >
        <Education />
      </div>
    </div>
  );
}
