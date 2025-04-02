"use client";

import CustomMousePointer from "@/Components/CustomMousePointer";
import Navigation from "@/Components/Navigation";
import { refs } from "@/Components/Navigation/constants";
import SectionHeading from "@/Components/SectionHeading";
import About from "@/Components/Sections/About";
import Education from "@/Components/Sections/Education";
import Experience from "@/Components/Sections/Experience";
// import Skills from "";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Contact from "@/Components/Sections/Contact";
const Skills = dynamic(() => import("@/Components/Sections/Skills"));

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  const [loadSkills, setLoadSkills] = useState(false);
  const [activeTab, setActiveTab] = useState(refs.About);

  const loading = ".loading";

  const anchorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    [refs.About]: null,
    [refs.Experience]: null,
    [refs.Education]: null,
    [refs.Skills]: null,
    [refs.Contact]: null,
  });

  useGSAP(() => {
    gsap.to(loading, {
      yPercent: -100,
      display: "none",
    });
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loadSkills) {
          setLoadSkills(true);
        }
      });
    });

    // Start observing the canvas element
    if (anchorRefs?.current?.[refs.Skills]) {
      observer.observe(anchorRefs?.current?.[refs.Skills] as Element);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.1 },
    );

    Object.values(anchorRefs?.current)?.forEach((ref) =>
      observer.observe(ref as HTMLElement),
    );

    return () => {
      Object.values(anchorRefs?.current)?.forEach((ref) =>
        observer.unobserve(ref as HTMLElement),
      );
    };
  }, []);

  return (
    <>
      <div
        className={` bg-theme-black bg-theme-grainy font-biryani text-theme-ivory rounded-b-8xl relative z-20 `}
      >
        <CustomMousePointer />
        {/* <Skills /> */}
        <Navigation
          refs={anchorRefs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <div
          className={
            " w-screen h-screen bg-theme-red absolute z-50 " +
            loading.replace(".", "")
          }
        />

        <div className="flex flex-col gap-15">
          <div
            className="w-full col-span-3"
            ref={(ref) => {
              anchorRefs.current[refs.About] = ref;
            }}
            id={refs.About}
          >
            <About />
          </div>
          <div
            className="w-full col-span-3"
            ref={(ref) => {
              anchorRefs.current[refs.Experience] = ref;
            }}
            id={refs.Experience}
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
            className="w-screen"
            ref={(ref) => {
              anchorRefs.current[refs.Skills] = ref;
            }}
            id={refs.Skills}
          >
            <div className="h-[300vh]">
              <SectionHeading
                text="to what I learned over the years"
                triggerClass="skills"
              />
            </div>
            {loadSkills && <Skills />}
          </div>
          <div
            className="col-span-3"
            id={refs.Education}
            ref={(ref) => {
              anchorRefs.current[refs.Education] = ref;
            }}
          >
            <Education />
          </div>
        </div>
      </div>

      <div
        ref={(ref) => {
          anchorRefs.current[refs.Contact] = ref;
        }}
        id={refs.Contact}
        className="w-screen h-screen z-10"
      >
        <Contact></Contact>
      </div>
    </>
  );
}
