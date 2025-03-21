import { useGSAP } from "@gsap/react";
import Time from "./Time";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = "" }) => {
  // useGSAP(() => {
  //   const attr = {
  //     y: -80,
  //     visibility: "visible",
  //     duration: 0.5,
  //     delay: 0.5,
  //     clutter: 0.3,
  //   };

  //   gsap
  //     .timeline()
  //     .to("#hey", attr)
  //     .to(".about-body", attr)
  //     .to("#scroll-text", { ...attr, y: -20 });
  // });

  return (
    <section
      className={"w-full h-screen relative px-20 p-20 " + className}
      id="about"
    >
      <div className="font-meddon text-8xl justify-self-center pb-10">
        Welcome
      </div>
      <div className="grid grid-cols-2 justify-center items-end">
        <div className="text-2xl font-rancho text-center">
          My name is
          <span className="font-meddon text-theme-sandy text-4xl">
            Varinder Singh
          </span>
          <div>
            I have been helping organisations with their UI development needs
            from the past
            <Time />
          </div>
        </div>
        <Image
          src="/hello.svg"
          width={400}
          height={400}
          alt="hello"
          className="ml-auto "
        />
        <Image
          src="/polygon.svg"
          width={600}
          height={600}
          alt="polygon"
          className="absolute right-0 top-20 -z-1"
        ></Image>
      </div>

      {/* <div className="flex h-full justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-medium oi font-alegreya-sans" id="hey">
            <span className="text-theme-ivory">Hey</span> there,
          </h2>
          <p className="text-4xl pt-4 pb-2 pl-6 font-medium about-body oi font-alegreya-sans">
            My name is <span className="text-theme-red">Varinder</span>
          </p>
          <p className=" w-full text-2xl pl-6 text-theme-ivory about-body font-mclaren oi ">
            I am a Frontend developer. I have been helping companies with their
            UI development needs from the past <Time />.
          </p>
        </div>
        <Image src="/hello.svg" width={400} height={400} alt="hello" />
      </div> */}
      <div
        className="flex flex-col items-center absolute mt-auto bottom-20 left-1/2 -translate-x-1/2"
        id="scroll-text"
      >
        <span className="-rotate-10 -translate-x-10 mt-auto ">Let's begin</span>
        <Image src="/pointer.svg" height={120} width={120} alt="pointer" />
      </div>
    </section>
  );
};

export default About;
