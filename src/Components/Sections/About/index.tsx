import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Time from "./Time";
import gsap from "gsap";
import React from "react";
import Button from "@/Components/Button";
import Link from "next/link";

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

    const tl = gsap
      .timeline({ delay: 1.3 })
      .from(spellingId, {
        opacity: 0,
        stagger: 0.05,
        duration: 0.05,
        ease: "none",
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
        className={`bg-theme-grainy h-screen relative flex flex-col items-center justify-between pt-10  md:p-20 md:pb-10  ${
          className
        }`}
      >
        <div className="flex flex-col w-full items-center">
          <div className="flex items-center">
            <h1 className="font-luckiest-guy  tracking-widest text-[clamp(5rem,10vw,12rem)] justify-self-center pb-15 relative">
              <div className={"stroke-text absolute   "}>
                <span className="flex items-center">HEY!</span>
              </div>
              <div id="welcome">
                <span id="hey">HEY!</span>
              </div>
            </h1>
          </div>

          <div className="grid grid-cols-1 justify-center items-end ">
            <div className="text-theme-lg md:text-theme-xl font-montserrat text-center">
              <div>
                I'm
                <span
                  className={` text-theme-red pl-2 text-4xl font-luckiest-guy `}
                  id="name"
                  onMouseEnter={() => {
                    gsap.to("#name", {
                      text: {
                        value: "Software Engineer",
                      },
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to("#name", {
                      text: {
                        value: "Varinder&nbsp;Singh",
                        padSpace: true,

                        newClass: "text-theme-ivory ",
                      },
                    });
                  }}
                >
                  Varinder&nbsp;Singh&nbsp;
                </span>
                <span className="font-noto-color-emoji text-4xl">👋</span>
              </div>
              <div>
                I have been helping organisations with their{" "}
                <i>UI development</i> needs from the past ⌛<Time></Time>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col w-full gap-10 mt-30 ${delayedText.replace(".", "")}`}
        >
          <div className="flex flex-col md:flex-row justify-center gap-5 px-10">
            <Link href="./resume.pdf" target="_blank" download>
              <Button className="md:min-w-[300px] py-5 w-full ">
                My resume <span className="font-noto-color-emoji">👔</span>
              </Button>
            </Link>

            <Button
              className="md:min-w-[300px] py-5"
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
