import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Time from "./Time";
import gsap from "gsap";
// import Image from "next/image";
import React from "react";
import RecursiveWrapper from "@/Components/SpellingAnimation/RecursiveWrapper";
import SplitAndId from "@/Components/SpellingAnimation";
import Button from "@/Components/Button";
import { NEON } from "@/utils/constants";

interface AboutProps {
  className?: string;
  scrollToContact?: () => void;
}

export const neonEffect = ".neon-effect";

const About: React.FC<AboutProps> = ({ className = "", scrollToContact }) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const spellingId = ".spelling-animation";
  const delayedText = ".delayed-text";
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          timelineRef.current?.progress(1).kill();
          document.querySelectorAll(neonEffect).forEach((element) => {
            element.classList.remove("text-neon-subtle");
          });
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
    };
  }, []);

  useGSAP(() => {
    if (hasPlayed) return;

    gsap.from("#name", {
      text: {
        value: "Software Engineer",
        newClass: "",
        type: "spread",
      },
      delay: 3,
      duration: 4,
      yPercent: -100,
      ease: "back",
      stagger: 0.2,
    });

    const tl = gsap
      .timeline({ delay: 1.3 })
      .from(spellingId, {
        opacity: 0,
        stagger: 0.05,
        duration: 0.05,
        ease: "none",
      })
      .to(neonEffect, {
        textShadow: NEON,
      })
      .to("#welcome", {
        delay: 2,
        textShadow: "none",
        rotate: -10,
        duration: 0.5,
        ease: "bounce",
        transformOrigin: "top right",
      })

      .to(neonEffect, { textShadow: "none" })
      .to("#welcome", {
        rotate: -80,

        duration: 2,
        ease: "bounce",
        transformOrigin: "top right",
      })
      .to("#welcome", {
        y: 2000,
        zIndex: -100,
        delay: 0.1,
        opacity: 0,
      })

      .to(delayedText, {
        opacity: 1,
        yPercent: 0,
        duration: 0.3,
        stagger: 0.2,
        ease: "back",
      })
      .call(() => {
        document.querySelectorAll(neonEffect).forEach((element) => {
          element.classList.add("text-neon-subtle");
        });
        setHasPlayed(true);
      });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [hasPlayed]);

  return (
    <section ref={sectionRef} id="about">
      <div className="absolute w-full h-screen inset rounded-b-full bg-mountain -z-50 inset-shadow" />
      <div className="absolute w-full h-screen inset opacity-80 bg-theme-black -z-40 " />

      <div
        className={`bg-theme-grainy h-screen relative flex flex-col items-center justify-between pt-40 md:p-20 md:pb-10  ${
          className
        }`}
      >
        <div className="flex flex-col w-full items-center">
          <div className="flex items-center">
            <h1 className="font-meddon text-4xl tracking-widest md:text-[clamp(4rem,10vw,12rem)] justify-self-center pb-15 relative">
              <div className={"stroke-text absolute   "}>
                <span className="flex items-center">
                  HEY!
                  {/* <span className="font-noto-color-emoji">👋</span> */}
                </span>
              </div>
              <div id="welcome">
                <RecursiveWrapper
                  Wrapper={SplitAndId}
                  wrapperProps={{ group: spellingId }}
                >
                  <span className={neonEffect.replace(".", "")}>HEY!</span>
                </RecursiveWrapper>
              </div>
            </h1>
          </div>

          {/* <hr className="w-full h-0.5 bg-theme-gray text-theme-gray my-15"></hr> */}
          <div className="grid grid-cols-1 justify-center items-end ">
            <div className="text-theme-lg md:text-theme-xl font-rancho text-center">
              <div>
                <span className={` text-theme-red pl-2 font-meddon `} id="name">
                  Varinder&nbsp;Singh&nbsp;
                </span>

                <span className="font-noto-color-emoji">👋</span>
              </div>
              <div className={delayedText.replace(".", "")}>
                I have been helping organisations with their{" "}
                <i>UI development</i> needs from the past ⌛
                <Time />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col w-full gap-10 mt-30 ${delayedText.replace(".", "")}`}
        >
          <div className="flex justify-center gap-1">
            <Button className="md:min-w-[300px] font-noto-color-emoji py-5  ">
              My resume <span className="font-noto-color-emoji">👔</span>
            </Button>

            <Button
              className="md:min-w-[300px]"
              onClick={() => scrollToContact?.()}
            >
              Contact me <span className="font-noto-color-emoji">🤙</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
