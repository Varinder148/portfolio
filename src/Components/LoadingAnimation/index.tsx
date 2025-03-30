import { FaCode, FaReact } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import { TbBrain } from "react-icons/tb";
import { useEffect } from "react";
import gsap from "gsap";

const LoadingAnimation = () => {
  useEffect(() => {
    gsap.to(".loading-icon", {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="flex items-center justify-center gap-8">
      <FaCode className="loading-icon text-white text-4xl" />
      <FaReact className="loading-icon text-white text-4xl" />
      <BiCodeAlt className="loading-icon text-white text-4xl" />
      <TbBrain className="loading-icon text-white text-4xl" />
    </div>
  );
};

export default LoadingAnimation;
