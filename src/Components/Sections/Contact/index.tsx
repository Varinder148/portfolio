import Linkedin from "@/app/Svgs/Linkedin";
import Mail from "@/app/Svgs/Mail";
import Phone from "@/app/Svgs/Phone";
import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { useViewport } from "@/Providers/ViewportProvider";
import { THEME } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const IconLinks = () => {
  const { isMobile } = useViewport();

  useGSAP(() => {
    gsap.from(".connect", {
      opacity: 0,
      y: 20,
      ease: "back",
      scrollTrigger: {
        trigger: "#education",
        start: `bottom 20%`,
      },
    });
  });

  return (
    <div className="flex gap-5 justify-center justify-self-center ">
      <Link
        className="connect block"
        href="mailto:varindersingh14.vs@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Mail
          width={isMobile ? 36 : 40}
          height={isMobile ? 36 : 40}
          className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
        />
      </Link>
      <Link
        className="connect block"
        href="https://in.linkedin.com/in/varinder-singh-2317b8150"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin
          height={isMobile ? 36 : 40}
          width={isMobile ? 36 : 40}
          className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
        />
      </Link>
      <Link
        href="tel:+917696134521"
        className="connect block"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Phone
          height={isMobile ? 36 : 40}
          width={isMobile ? 36 : 40}
          className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
        ></Phone>
      </Link>
    </div>
  );
};

const Contact = ({ pinTriggerContact }: { pinTriggerContact: string }) => {
  const REVEAL = "reveal";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${pinTriggerContact}`,
        start: "top top",
      },
    });

    tl.to(`.${REVEAL}`, {
      position: "fixed",
      top: 0,
      left: 0,
      ease: "power2.out",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#education",
          start: `bottom 20%`,
        },
      })
      .from("#connect", {
        rotate: 90,
        opacity: 0,
        ease: "back",

        transformOrigin: "top left",
      })
      .from("#together", {
        rotate: -90,
        opacity: 0,
        ease: "back",

        transformOrigin: "top left",
      });
  });

  const validateEmpty = (value: string) => {
    if (value?.length === 0) {
      return "This field cannot be empty.";
    }
  };
  const validateEmail = (email: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "Invalid Email Address";
    }
  };

  const handleSubmit = () => {
    if (!validateEmail(email) && !validateEmpty(name)) {
      console.log("submitted");
    }
  };

  return (
    <section
      className={`w-screen overflow-hidden min-h-screen font-overpass`}
      id="education"
    >
      <div
        className={`relative h-full items-center mb-10 px-10 justify-center  w-screen flex-col flex lg:flex-row  ${REVEAL}`}
      >
        <h2 className="text-center flex flex-wrap w-full justify-center gap-x-2 items-center text-5xl md:w-1/2 pb-5 md:text-[clamp(6rem,10vw,7rem)] font-luckiest-guy">
          Let's{" "}
          <i className="text-theme-red inline-block" id="connect">
            Connect
          </i>
        </h2>
        <div className={"flex items-center gap-10 flex-col  "}>
          <h3
            className={
              "text-lg md:text-3xl uppercase text-center font-luckiest-guy "
            }
          >
            and build awesome things{" "}
            <strong
              id="together"
              className="bg-theme-green inline-block text-2xl md:text-3xl font-montserrat p-2 text-theme-ivory"
            >
              together!
            </strong>
          </h3>
          <IconLinks></IconLinks>
          <div className={"grid grid-cols-2 gap-5  "}>
            <TextField
              label={"Email address:"}
              value={email}
              type="email"
              onChange={(value: string) => setEmail(value)}
              validate={validateEmail}
            />
            <TextField
              label={"Name:"}
              value={name}
              onChange={(value: string) => setName(value)}
              validate={validateEmpty}
            />
            <TextField
              label={"Your Message"}
              value={message}
              className="col-span-2"
              onChange={(value: string) => setMessage(value)}
              multiline
            />
            <Button
              className="col-span-2 py-2 px-10 min-w-[300px] font-semibold mx-auto"
              onClick={handleSubmit}
              color={THEME.GREEN}
            >
              <div className="flex justify-center gap-1">
                Send
                <Image
                  src="send.svg"
                  width={16}
                  height={16}
                  alt="pointer icon"
                ></Image>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
