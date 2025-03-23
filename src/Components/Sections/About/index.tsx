import { useGSAP } from "@gsap/react";
import Time from "./Time";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import RecursiveWrapper from "@/Components/SpellingAnimation/RecursiveWrapper";
import SplitAndId from "@/Components/SpellingAnimation";

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = "" }) => {
  const spellingId = ".spelling-animation";
  const delayedText = ".delayed-text";
  useGSAP(() => {
    gsap.from(delayedText, {
      display: "none",
      // ease: "back",
      // duration: 2,
      opacity: 0,
      yPercent: 5,
      delay: 4,
    });

    gsap
      .timeline()
      .to(spellingId, {
        visibility: "visible",
        stagger: 0.1,
        duration: 0.1,
        delay: 1,
        ease: "back.in",
        onComplete: function () {
          document.querySelectorAll(spellingId).forEach((element) => {
            element.classList.add("text-neon-subtle");
          });
        },
      })
      .fromTo(
        spellingId,
        {
          textShadow: "none",
          delay: 1,
          duration: 0.5,
          ease: "elastic.inOut",
        },
        {
          textShadow: `0 0 1px ,
                      0 0 2px ,
                      0 0 4px ,
                      0 0 8px`,
          duration: 0.5,
          delay: 0.5,
          ease: "elastic.inOut",
          repeat: 2,
        }
      );
  });

  return (
    <section
      className={"w-full h-screen relative px-20 p-20 " + className}
      id="about"
    >
      <h1 className="font-meddon text-8xl justify-self-center pb-20 relative">
        <div className={"stroke-text absolute -left-2 top-1  "}>Welcome</div>

        <RecursiveWrapper
          Wrapper={SplitAndId}
          wrapperProps={{ group: spellingId }}
        >
          Welcome
        </RecursiveWrapper>
      </h1>
      <div className="grid grid-cols-1 justify-center items-end ">
        <div className="text-2xl font-rancho text-center pt-20">
          <div>
            <RecursiveWrapper
              Wrapper={SplitAndId}
              wrapperProps={{ group: spellingId }}
            >
              My name is
              <span className="font-meddon text-theme-red text-4xl">
                Varinder Singh
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
      <div
        className={
          "flex flex-col items-center absolute mt-auto bottom-20 left-1/2 -translate-x-1/2 " +
          delayedText.replace(".", "")
        }
      >
        <span className="-rotate-10 -translate-x-10 mt-auto ">
          Let us begin
        </span>
        <Image src="/pointer.svg" height={120} width={120} alt="pointer" />
      </div>
    </section>
  );
};

export default About;
