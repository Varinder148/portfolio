import React, { useRef, useEffect } from "react";
import Time from "./Time";
import gsap from "gsap";
import Button from "@/Components/Button";
import Link from "next/link";
import { THEME } from "@/utils/constants";
import { useViewport } from "@/Providers/ViewportProvider";
import { SplitText } from "gsap/all";

interface AboutProps {
  className?: string;
  scrollToContact?: () => void;
}

const About: React.FC<AboutProps> = ({ className = "", scrollToContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const highlightedValues = ".highlighted-values";
  const { isMobile } = useViewport();
  // Store timelines in refs to kill previous ones
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const animRef = useRef<gsap.core.Timeline | null>(null);
  const splitRef = useRef<any>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // use gsap.context to scope selectors and make cleanup simple
    const ctx = gsap.context(() => {
      // Kill previous timelines if any
      if (tlRef.current) tlRef.current.kill();
      if (animRef.current) animRef.current.kill();

      // hey text animation
      const tl = gsap
        .timeline()
        .set("#hey", { opacity: 0 })
        .to("#hey", {
          delay: 1,
          opacity: 1,
          text: { value: "Hey there!" },
        });
      tlRef.current = tl;

      const split = SplitText.create(".split", { type: "lines" });

      // store split on ref for cleanup (can't reference ctx inside this callback)
      splitRef.current = split;

      const anim = gsap
        .timeline({ delay: 0.1 })
        .to("#name", { text: { value: "Software Engineer" } })
        .from("#about-block", { opacity: 0 })
        .from(split.lines, {
          opacity: 0,
          duration: 0.3,
          ease: "sine.in",
          stagger: 0.25,
        })
        .from(`${highlightedValues}:nth-child(2n)`, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          ease: "back.in",
          stagger: { amount: 0.2, from: "random" },
        })
        .from(`${highlightedValues}:nth-child(2n+1)`, {
          y: 20,
          opacity: 0,
          duration: 0.2,
          ease: "back.in",
          stagger: { amount: 0.2, from: "random" },
        })
        .to("#name", {
          text: { value: "Varinder\u00A0Singh", padSpace: true },
        });

      animRef.current = anim;

      // store split on ctx for cleanup
    }, sectionRef.current);

    (ctx as any)._split = splitRef.current;

    return () => {
      // revert SplitText first if present
      splitRef.current?.revert?.();
      ctx?.revert?.();
    };
    // run once on mount
  }, []);

  return (
    <section ref={sectionRef} id="about" className={`relative ${className}`}>
      <div
        className={`absolute w-full h-screen inset rounded-b-full bg-mountain bg-fixed -z-50 inset-shadow ${isMobile ? "hidden" : ""}`}
      />
      <div
        className={`absolute w-full h-screen inset opacity-80 bg-theme-black -z-40 ${isMobile ? "hidden" : ""}`}
      />
      <div className="bg-theme-grainy min-h-screen relative flex flex-col items-center justify-between pt-10">
        <div className="flex flex-col w-full items-center">
          <h1 className="flex items-center font-luckiest-guy  tracking-wider text-4xl mb-10 md:text-[clamp(6rem,8vw,6rem)] justify-self-center  relative -z-1 ">
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
              className="text-md split md:text-lg p-5 md:w-3/4 mx-auto flex gap-5 flex-col tracking-normal font-overpass "
            >
              <p className="">
                I’m a{" "}
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")} translate-0 bg-theme-red-wood rounded-sm p-1 pt-2  font-bold text-theme-ivory font-overpass text-lg md:text-xl uppercase italic`}
                >
                  dedicated
                </span>
                ,{" "}
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")} font-bold font-montserrat mx-1 text-theme-sandy border-2 border-theme-sandy p-1 text-lg md:text-xl uppercase `}
                >
                  hardworking
                </span>
                professional who
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")} p-2 m-2 text-theme-black font-bold text-lg md:text-xl bg-theme-sandy rounded-full`}
                >
                  loves
                </span>
                working with others. I’m always eager to learn
                <span
                  className={`inline-block underline ${highlightedValues.replace(".", "")} font-thin mx-2 text-theme-violet text-lg md:text-xl capitalize italic font-luckiest-guy`}
                >
                  new
                </span>
                things, which has helped me become more
                <span
                  className={`inline-block  ${highlightedValues.replace(".", "")}  text-theme-rose text-2xl font-bold stroke-text-bold mx-1 `}
                >
                  patient
                </span>
                and ready to take on any{" "}
                <span
                  className={`inline-block capitalize ${highlightedValues.replace(".", "")} p-1 mt-2 rounded-b-2xl font-bold bg-theme-ivory mx-1 text-theme-gray text-lg md:text-xl font-montserrat`}
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
              </div>
            </div>
            <Time></Time>
          </div>
        </div>

        <div className={`flex flex-col w-full gap-10 `}>
          <div className="flex flex-col md:flex-row justify-center gap-5 p-10">
            <Link href="./Varinder-Singh_Resume.pdf" target="_blank" download>
              <Button
                className=" md:min-w-[300px]  w-full "
                color={THEME.REDWOOD}
              >
                My resume
              </Button>
            </Link>

            <Button
              className=" md:min-w-[300px]  "
              onClick={() => scrollToContact?.()}
              color={THEME.SANDY}
            >
              Contact me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
