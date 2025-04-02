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
}

export const neonEffect = ".neon-effect";

const About: React.FC<AboutProps> = ({ className = "" }) => {
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

    const tl = gsap
      .timeline({ delay: 1.3 })
      .from(spellingId, {
        opacity: 0,
        stagger: 0.05,
        duration: 0.05,
        ease: "none",
      })

      .fromTo(
        neonEffect,
        { textShadow: "none" },
        {
          textShadow: NEON,
          duration: 0.2,
          stagger: 0.1,
          ease: "none",
          repeat: 2,
          repeatDelay: 0.2,
        },
      )
      .to("#welcome", {
        rotate: -10,
        duration: 0.5,
        ease: "bounce",
        transformOrigin: "top right",
      })
      .to(neonEffect, { textShadow: "none" })
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
    <section
      ref={sectionRef}
      className={
        "w-full min-h-screen relative flex flex-col items-center justify-between pt-40 md:p-20 md:pb-10 " +
        className
      }
      id="about"
    >
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center">
          <h1 className="font-meddon text-4xl md:text-[clamp(4rem,10vw,12rem)] justify-self-center pb-15 relative">
            <div className={"stroke-text absolute   "}>Welcome</div>
            <div id="welcome">
              <RecursiveWrapper
                Wrapper={SplitAndId}
                wrapperProps={{ group: spellingId }}
              >
                <span className={neonEffect.replace(".", "")}>Welcome</span>
              </RecursiveWrapper>
            </div>
          </h1>
        </div>

        <hr className="w-full h-1 bg-theme-gray text-theme-gray my-10"></hr>
        <div className="grid grid-cols-1 justify-center items-end ">
          <div className="text-theme-lg md:text-theme-xl font-rancho text-center">
            <div>
              <RecursiveWrapper
                Wrapper={SplitAndId}
                wrapperProps={{ group: spellingId }}
              >
                My name is
                <span
                  className={
                    "font-meddon text-theme-red pl-2 " +
                    neonEffect.replace(".", "")
                  }
                >
                  Varinder&nbsp;Singh
                </span>
              </RecursiveWrapper>
            </div>
            <div className={delayedText.replace(".", "")}>
              I have been helping organisations with their UI development needs
              from the past
              <Time />
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "flex flex-col w-full gap-10 " + delayedText.replace(".", "")
        }
      >
        <div className="flex justify-center gap-1">
          <Button className="md:min-w-[300px] ">My resume</Button>

          <Button className="md:min-w-[300px]">Contact me</Button>
        </div>
        {/* 
        <div
          className={
            "flex flex-col items-center " + delayedText.replace(".", "")
          }
        >
          <span className="-rotate-10 -translate-x-10 mt-auto ">
            Let us start
          </span>
          <Image src="/pointer.svg" height={120} width={120} alt="pointer" />
        </div> */}
      </div>
    </section>
  );
};

export default About;
