"use client";

import CustomMousePointer from "@/Components/CustomMousePointer";
import Navigation from "@/Components/Navigation";
import { refs } from "@/Components/Navigation/constants";
import SectionHeading from "@/Components/SectionHeading";
import About from "@/Components/Sections/About";
import Experience from "@/Components/Sections/Experience";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin, SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Contact from "@/Components/Sections/Contact";
import { ViewportProvider } from "@/Providers/ViewportProvider";
import Education from "@/Components/Sections/Education";
import { isIOSSafari } from "@/utils/iosUtils";
import PerformanceMonitor from "@/Components/PerformanceMonitor";
const Skills = dynamic(() => import("@/Components/Sections/Skills"));

export default function Home() {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  // iOS Safari ScrollTrigger optimization
  useEffect(() => {
    const iosSafari = isIOSSafari();

    if (iosSafari) {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });
    }
  }, []);

  const pinTriggerContact = "pinTrigger";

  const [loadSkills, setLoadSkills] = useState(false);
  const [activeTab, setActiveTab] = useState(refs.About);

  const loading = ".loading";

  const anchorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    [refs.About]: null,
    [refs.Experience]: null,
    [refs.Skills]: null,
    [refs.Contact]: null,
    [refs.Education]: null,
  });

  useGSAP(() => {
    gsap.to(loading, {
      yPercent: -100,
      display: "none",
      delay: 0.2,
    });
  });

  // Consolidated observer for all sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Handle Skills loading
            if (entry.target.id === refs.Skills && !loadSkills) {
              setLoadSkills(true);
            }
            // Handle active tab updates
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.1 },
    );

    Object.values(anchorRefs?.current)?.forEach(
      (ref) => ref && observer.observe(ref as HTMLElement),
    );

    return () => {
      Object.values(anchorRefs?.current)?.forEach(
        (ref) => ref && observer.unobserve(ref as HTMLElement),
      );
    };
  }, [loadSkills]);

  return (
    <ViewportProvider>
      <div
        className={` bg-theme-black bg-theme-grainy font-overpass text-theme-ivory rounded-b-4xl md:rounded-b-8xl relative z-20 `}
      >
        <Navigation
          refs={anchorRefs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />

        <div
          className={` w-screen h-screen bg-theme-red grid place-items-center fixed z-50 overflow-hidden rounded-b-4xl ${loading.replace(
            ".",
            "",
          )}`}
        >
          Loading...
        </div>

        <div className="flex flex-col gap-40">
          <div
            className="w-full col-span-3"
            ref={(ref) => {
              anchorRefs.current[refs.About] = ref;
            }}
            id={refs.About}
          >
            <About
              scrollToContact={() =>
                anchorRefs.current?.[refs.Contact]?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            />
          </div>
          <div
            className="w-full flex gap-40 flex-col"
            ref={(ref) => {
              anchorRefs.current[refs.Experience] = ref;
            }}
            id={refs.Experience}
          >
            <SectionHeading triggerClass="experience">
              Let's begin with the{" "}
              <span className="italic text-theme-green">people</span> I have{" "}
              <span className="semibold text-theme-red-wood">Worked</span> with
            </SectionHeading>
            <Experience />
          </div>
          <div
            className={`w-screen flex gap-40 flex-col `}
            ref={(ref) => {
              anchorRefs.current[refs.Skills] = ref;
            }}
            id={refs.Skills}
          >
            <SectionHeading triggerClass="skills">
              <span className="text-theme-sandy"> 'The Skills' </span> I
              collected over the years
              <span className="text-theme-gray"></span>
            </SectionHeading>
            <div className={`w-screen h-screen  ${pinTriggerContact}`}>
              {loadSkills && <Skills />}
            </div>
          </div>

          <div
            ref={(ref) => {
              anchorRefs.current[refs.Education] = ref;
            }}
            id={refs.Education}
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
        className="w-screen h-screen"
      >
        <Contact pinTriggerContact={pinTriggerContact} />
      </div>
      <CustomMousePointer />
      <PerformanceMonitor />
    </ViewportProvider>
  );
}
