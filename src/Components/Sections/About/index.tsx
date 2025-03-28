import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import Time from "./Time";
import gsap from "gsap";
import Image from "next/image";
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
  const spellingId = ".spelling-animation";
  const delayedText = ".delayed-text";
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const delayedAnimRef = useRef<gsap.core.Tween>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio <= 0.5) {
          timelineRef.current?.progress(1).kill();
          delayedAnimRef.current?.progress(1).kill();
          document.querySelectorAll(neonEffect).forEach((element) => {
            element.classList.add("text-neon-subtle");
          });
        }
      },
      { threshold: [0.5] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const delayedAnim = gsap.from(delayedText, {
      ease: "back",
      opacity: 0,
      duration: 0.5,
      yPercent: 5,
      stagger: 0.5,
      delay: 4,
    });
    delayedAnimRef.current = delayedAnim;

    const tl = gsap
      .timeline()
      .to(spellingId, {
        visibility: "visible",
        stagger: 0.1,
        duration: 0.1,
        delay: 1,
        ease: "back.in",
        onComplete: function () {
          document.querySelectorAll(neonEffect).forEach((element) => {
            element.classList.add("text-neon-subtle");
          });
        },
      })
      .fromTo(
        neonEffect,
        {
          textShadow: "none",
          delay: 1,
          stagger: 0.5,
          duration: 0.5,
          ease: "elastic.inOut",
        },
        {
          textShadow: NEON,
          duration: 0.5,
          delay: 0.5,
          stagger: 0.5,
          ease: "elastic.inOut",
          repeat: 2,
        }
      );
    timelineRef.current = tl;

    return () => {
      delayedAnim.kill();
      tl.kill();
    };
  });

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
          <h1 className="font-meddon text-4xl md:text-7xl justify-self-center pb-15 relative">
            <div className={"stroke-text absolute -left-2 top-1  "}>
              Welcome
            </div>

            <RecursiveWrapper
              Wrapper={SplitAndId}
              wrapperProps={{ group: spellingId }}
            >
              <span className={neonEffect.replace(".", "")}>Welcome</span>
            </RecursiveWrapper>
          </h1>
        </div>

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
        <div className="flex justify-between">
          <Button>My resume</Button>

          <Button variant="secondary">Contact me</Button>
        </div>

        <div
          className={
            "flex flex-col items-center " + delayedText.replace(".", "")
          }
        >
          <span className="-rotate-10 -translate-x-10 mt-auto ">
            Let us start
          </span>
          <Image src="/pointer.svg" height={120} width={120} alt="pointer" />
        </div>
      </div>
    </section>
  );
};

export default About;
