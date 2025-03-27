import Button from "@/Components/Button";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";

interface CardProps {
  data: {
    id: number;
    logo: string;
    name: string;
    from: string;
    to: string;
    responsibilities: string[];
    location: string;
    position: string;
  };
}

const CardFront: React.FC<{ data: CardProps["data"] }> = ({ data }) => {
  return (
    <>
      <div className="mb-5 text-4xl">{data.position}</div>
      <hr className="w-full my-5 shadow-theme-gray shadow-spread-2 text-theme-gray bg-theme-gray h-1"></hr>
      <div className="flex items-center gap-10">
        <MdOutlineAccessTime className="text-theme-red " />
        {data.from}&nbsp;-&nbsp;{data.to}
      </div>
      <div className="flex items-center gap-10">
        <IoLocationOutline className="text-theme-red" />
        {data.location}
      </div>
    </>
  );
};

const CardBack: React.FC<{ data: CardProps["data"] }> = ({ data }) => {
  return (
    <ul className="text-biryani text-md with bullets">
      {data.responsibilities.map((responsibilty, index) => (
        <li key={index}>{responsibilty}</li>
      ))}
    </ul>
  );
};

const Card: React.FC<CardProps> = ({ data }) => {
  const [expanded, setIsExpanded] = useState(true);
  const [lights, setLights] = useState(true);

  const content = useRef(null);
  const handleOnClick = () => {
    const tl = gsap.timeline();
    tl.to(content.current, {
      scaleY: 0,
      duration: 0.3,
      ease: "power1.in",
      onComplete: () => {
        setIsExpanded((prev) => !prev);
        gsap.to(content.current, {
          scaleY: 1,
          duration: 0.3,
          ease: "power1.out",
        });
      },
    });
  };

  return (
    <div className="w-screen font-rancho text-2xl flex px-10 gap-10">
      <div>
        <div className="w-[400px] min-h-[600px] ">
          <Image
            src={`./office (${data.id}).webp`}
            width={-1}
            height={-1}
            className="w-full h-full "
            alt="logo"
          ></Image>
        </div>
      </div>

      <div className="flex flex-col px-20 items-center flex-1">
        <h2 className="text-7xl  ">{data.name}</h2>
        <div
          ref={content}
          className="w-full min-h-[400px] flex justify-between flex-col"
        >
          <hr
            className={clsx("w-full my-5  h-1", {
              "shadow-theme-red shadow-spread-2 text-theme-red bg-theme-red":
                lights,
              "text-theme-ivory bg-theme-ivory": !lights,
            })}
          ></hr>
          {expanded ? <CardFront data={data} /> : <CardBack data={data} />}
          <hr
            className={clsx("w-full my-5  h-1", {
              "shadow-theme-red shadow-spread-2 text-theme-red bg-theme-red":
                lights,
              "text-theme-ivory bg-theme-ivory": !lights,
            })}
          ></hr>
        </div>
        <div className="flex gap-10">
          <Button onClick={handleOnClick} variant="secondary">
            {expanded ? "My Duties" : "Overview"}
          </Button>
          <Button onClick={() => setLights((prev) => !prev)}>
            Turn lights {lights ? "off" : "on"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
