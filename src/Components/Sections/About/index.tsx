import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Time from "./Time";
import gsap from "gsap";
import React from "react";
import Button from "@/Components/Button";
import Link from "next/link";
import { THEME } from "@/utils/constants";

interface AboutProps {
  className?: string;
  scrollToContact?: () => void;
}

const About: React.FC<AboutProps> = ({ className = "", scrollToContact }) => {
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const highlightedValues = ".highlighted-values";

  useGSAP(() => {
    // hey text animation
    const tl = gsap
      .timeline()
      .set("#hey", {
        opacity: 0,
      })
      .to("#hey", {
        delay: 1,
        opacity: 1,
        text: {
          value: "Hello!",
        },
      });
    // .from("#hey", {
    //   rotate: 50,
    //   duration: 0.5,
    //   ease: "bounce",
    //   transformOrigin: "top right",
    // });

    gsap
      .timeline({ delay: 0.1 })
      .to("#name", {
        text: {
          value: "Software Engineer",
        },
      })
      .from("#about-block", {
        opacity: 0,
        yPercent: 20,
        scale: 1.1,
        duration: 0.2,
        ease: "back.in",
      })
      .from(`${highlightedValues}:nth-child(2n)`, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: "back.in",
        stagger: {
          amount: 0.2,
          from: "random",
        },
      })
      .from(`${highlightedValues}:nth-child(2n+1)`, {
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: "back.in",
        stagger: {
          amount: 0.2,
          from: "random",
        },
      })
      .to("#name", {
        text: {
          value: "Varinder&nbsp;Singh",
          padSpace: true,
        },
      });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about">
      <div className="absolute w-full h-screen inset rounded-b-full bg-mountain -z-50 inset-shadow" />
      <div className="absolute w-full h-screen inset opacity-80 bg-theme-black -z-40 " />

      <div
        className={`bg-theme-grainy min-h-screen relative flex flex-col items-center justify-between pt-10  ${
          className
        }`}
      >
        <div className="flex flex-col w-full items-center">
          <h1 className="flex items-center font-luckiest-guy  tracking-wider text-4xl mb-2 md:text-[clamp(6rem,10vw,8rem)] justify-self-center  relative -z-1">
            <span id="hey">.</span>
          </h1>

          <div className="text-md md:text-xl font-montserrat text-center">
            <div>
              I'm
              <button
                className={`text-theme-red pl-2 text-2xl md:text-3xl font-luckiest-guy pb-5`}
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
                    },
                  });
                }}
              >
                Varinder Singh
              </button>
            </div>
            <div
              id="about-block"
              className="text-md md:text-xl p-5 md:w-3/4 mx-auto flex gap-5 flex-col tracking-normal font-overpass "
            >
              <p>
                I’m a{" "}
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")} translate-0 bg-theme-red-wood rounded-sm p-1 pt-2  font-bold text-theme-ivory font-overpass text-lg md:text-2xl uppercase italic`}
                >
                  dedicated
                </span>
                ,{" "}
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")} font-bold font-montserrat mx-1 text-theme-sandy border-2 border-theme-sandy p-1 text-lg md:text-2xl uppercase `}
                >
                  hardworking
                </span>
                professional who
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")} p-2 m-2 text-theme-black font-bold text-lg md:text-2xl bg-theme-sandy rounded-full`}
                >
                  loves
                </span>
                working with others. I’m always eager to learn
                <span
                  className={`inline-block underline ${highlightedValues.replace(".", "")} font-thin mx-2 text-theme-violet text-lg md:text-2xl capitalize italic font-luckiest-guy`}
                >
                  new
                </span>
                things, which has helped me become more
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")}  text-theme-rose text-4xl font-bold stroke-text-bold mx-1 `}
                >
                  patient
                </span>
                and ready to take on any{" "}
                <span
                  className={`inline-block capitalize ${highlightedValues.replace(".", "")} p-1 mt-2 rounded-b-2xl font-bold bg-theme-ivory mx-1 text-theme-gray text-lg md:text-2xl font-montserrat`}
                >
                  challenge
                </span>
                .
              </p>
              <div className="mt-5">
                <p>
                  I have been helping build{" "}
                  <i className="text-theme-violet">seamless </i>
                  and <strong className="text-theme-sandy">impactful </strong>
                  user interfaces, from the past ⌛
                </p>
                <Time></Time>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col w-full gap-10 `}>
          <div className="flex flex-col md:flex-row justify-center gap-5 p-10">
            <Link href="./resume.pdf" target="_blank" download>
              <Button className=" md:min-w-[300px]  w-full " color={THEME.ROSE}>
                My resume <span className="font-noto-color-emoji">👔</span>
              </Button>
            </Link>

            <Button
              className=" md:min-w-[300px]  "
              onClick={() => scrollToContact?.()}
              color={THEME.REDWOOD}
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
