"use client";

import CustomMousePointer from "@/Components/CustomMousePointer";
import Navigation from "@/Components/Navigation";
import { refs } from "@/Components/Navigation/constants";
import SectionHeading from "@/Components/SectionHeading";
import About from "@/Components/Sections/About";
import Education from "@/Components/Sections/Education";
import Experience from "@/Components/Sections/Experience";
import Skills from "@/Components/Sections/Skills";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  const loading = ".loading";

  const anchorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    [refs.About]: null,
    [refs.Experience]: null,
    [refs.Education]: null,
    [refs.Skills]: null,
  });

  useGSAP(() => {
    gsap.to(loading, {
      yPercent: -100,
      display: "none",
    });
  });

  return (
    <>
      <CustomMousePointer />
      <Skills />
      <Navigation refs={anchorRefs} />
      {/* <div
        className={
          " w-screen h-screen bg-theme-red absolute z-50 " +
          loading.replace(".", "")
        }
      /> */}

      <div className="flex flex-col gap-15">
        <div
          className="w-full col-span-3"
          ref={(ref) => {
            anchorRefs.current[refs.About] = ref;
          }}
        >
          <About />
        </div>
        <div
          className="w-full col-span-3"
          ref={(ref) => {
            anchorRefs.current[refs.Experience] = ref;
          }}
        >
          <div className="h-[300vh]">
            <SectionHeading
              text="with the people I have Worked with"
              triggerClass="experience"
            />
          </div>

          <div className="w-full">
            <Experience />
          </div>
        </div>
        <div
          className="w-full col-span-3"
          ref={(ref) => {
            anchorRefs.current[refs.Skills] = ref;
          }}
        >
          <div className="h-[300vh]">
            <SectionHeading
              text="to what I learned over the years"
              triggerClass="skills"
            />
          </div>
          <Skills />
        </div>
        <div
          className="col-span-3"
          ref={(ref) => {
            anchorRefs.current[refs.Education] = ref;
          }}
        >
          <Education />
        </div>
      </div>
    </>
  );
}
