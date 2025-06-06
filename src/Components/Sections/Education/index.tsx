import { useViewport } from "@/Providers/ViewportProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const Education = () => {
  const { isMobile } = useViewport();

  useGSAP(() => {
    if (!isMobile) {
      gsap.from("#college", {
        scaleX: 0,
        ease: "back",
        scrollTrigger: {
          trigger: "#education",
          start: `top 20%`,
        },
      });
    }
  });

  return (
    <section
      className="text-lg flex px-10 pb-40 flex-col gap-30 justify-between items-center"
      id="education"
    >
      <h2 className="text-center text-5xl md:text-[clamp(6rem,10vw,12rem)] font-luckiest-guy">
        My Education
      </h2>
      <article className="flex gap-10 lg:gap-40">
        <p className="max-w-[300px] my-auto text-md">
          I graduated from{" "}
          <Link
            href="https://www.gndec.ac.in/"
            className="underline text-theme-sandy"
          >
            Guru Nanak Dev Engineering College, Ludhiana
          </Link>{" "}
          in 2019 with Bachelors of Technology degree in{" "}
          <i className="text-2xl text-theme-olive">Computer Sciences</i> with{" "}
          <strong className="text-2xl bg-theme-sandy p-1  rounded-sm">
            8.49
          </strong>{" "}
          CGPA
        </p>
        <Image
          src="/gne.webp"
          className="hidden md:block object-cover object-center h-[600px] w-auto"
          height={0}
          width={0}
          loading="lazy"
          alt="gne image"
          id="college"
        ></Image>
      </article>
    </section>
  );
};

export default Education;
