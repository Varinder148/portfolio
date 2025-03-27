import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import Card from "./Card";

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = [
    {
      id: 1,
      color: "#000000",
      logo: "./infosys.png",
      name: "Infosys",
      from: "5 Aug, 2019",
      to: "6 Sep, 2021",
      position: "Systems Engineer",
      location: "Chandigarh | India",
      responsibilities: [
        "Developed serverless web apps with React, enabling data uploads processed by a machine learning model on AWS.",
        "Deployed the app using AWS, utilizing AWS Lambda to manage API endpoints.",
      ],
    },
    {
      id: 2,
      color: "#66ff66",
      logo: "./geektrust.png",
      name: "Geektrust",
      from: "8 Sep, 2021",
      to: "22 Apr, 2022",
      position: "Applications Developer",
      location: "Bangalore | India",
      responsibilities: [
        "Developed serverless web apps with React, enabling data uploads processed by a machine learning model on AWS.",
        "Deployed the app using AWS, utilizing AWS Lambda to manage API endpoints.",
        "Created proof-of-concept solutions tailored to client needs and objectives.",
        "Gathered and analyzed requirements, developed technical specifications, and devised implementation strategies.",
      ],
    },
    {
      id: 3,
      color: "#6666ff",
      logo: "./thoughtworks.svg",
      name: "Thoughtworks",
      from: "25 Apr, 2022",
      to: "09 Jun, 2023",
      position: "UI Developer - Consultant",
      location: "Gurugram | India",
      responsibilities: [
        "Developed serverless web apps with React and AWS, enabling data uploads processed by a machine learning model and managed through AWS Lambda API endpoints.",
        "Created proof-of-concept solutions, gathered requirements, and developed technical specifications to meet client needs.",
        "Implemented FormBuilder React apps and micro frontends using Module Federation for scalable architecture.",
        "Adopted new technologies based on project needs, following TDD practices to write clean, reusable components and standardized setups.",
      ],
    },
    {
      id: 4,
      color: "#ffff66",
      logo: "./gartner.svg",
      name: "Gartner",
      from: "12 Jun, 2023",
      to: "present",
      position: "Software Engineer 2",
      location: "Gurugram | India",
      responsibilities: [
        "Developed serverless web apps with React and AWS, enabling data uploads processed by a machine learning model and managed via AWS Lambda API endpoints.",
        "Created proof-of-concept solutions, gathered requirements, and developed technical specifications to meet client needs.",
        "Implemented FormBuilder React apps and micro frontends using Module Federation for scalable, modular architecture.",
        "Adopted new technologies based on project needs, following TDD practices to write clean, reusable components and standardized setups.",
        "Migrated serverless codebase to a Next.js monorepo for improved development and maintainability.",
        "Contributed to the development of a high-impact application generating the majority of revenue for the business unit.",
        "Led A/B experiments using LaunchDarkly to assess feature performance and deploy high-performing variants.",
        "Utilized Contentful to design and implement dynamic blog pages for easy content management and updates.",
        "Leveraged Datadog and FullStory to monitor and optimize the performance of newly released features.",
      ],
    },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = containerRef.current!.scrollWidth - window.innerWidth;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience-section",
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        invalidateOnRefresh: true,
        scrub: 1,
      },
    });

    timeline
      .fromTo(
        ".title-wrapper > h1",
        { scale: 0.8, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.1 },
      )
      .fromTo(
        containerRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.1,
        },
      )
      .to(containerRef.current, {
        translateX: -totalScroll,
        ease: "power1.out",
      });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="experience-section" className="h-screen overflow-hidden">
      <div className="title-wrapper">
        <h1 className="font-meddon text-5xl py-15 stroke-text w-full text-center">
          with the people I have worked with
        </h1>
      </div>

      <div
        ref={containerRef}
        className="flex"
        id="experience"
        style={{
          height: "calc(100vh - 120px)",
          width: `${cards.length * 100}vw`,
        }}
      >
        {cards.map((card) => (
          <Card data={card} key={card.id} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
