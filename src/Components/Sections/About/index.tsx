"use client";

import { useGSAP } from "@gsap/react";
import Time from "./Time";
import gsap from "gsap";

const About: React.FC = ({ className }) => {
  useGSAP(() => {
    const attr = {
      y: -80,
      visibility: "visible",
      duration: 0.5,
      delay: 0.5,
      clutter: 0.3,
    };

    gsap.timeline().to("#hey", attr).to(".about-body", attr);
  });

  return (
    <section className={"w-full h-screen pl-20 " + className} id="about">
      <div className="flex flex-col justify-center h-full ">
        <h2 className="text-4xl font-medium invisible" id="hey">
          <span className="text-green-light ">Hey</span> there,
        </h2>
        <p className="text-4xl pt-4 pb-2 pl-6 font-medium about-body invisible">
          My name is <span className="text-green-light">Varinder</span>
        </p>
        <p className="text-2xl pl-6 text-orange-dark about-body invisible max-w-1/2">
          I am a Frontend developer. I have been helping companies with their UI
          development needs from the past <Time />.
        </p>
      </div>
    </section>
  );
};

export default About;
