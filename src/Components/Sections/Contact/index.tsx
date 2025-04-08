import Linkedin from "@/app/Svgs/Linkedin";
import Mail from "@/app/Svgs/Mail";
import Phone from "@/app/Svgs/Phone";
import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { useViewport } from "@/Providers/ViewportProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useState } from "react";

const Contact = ({ pinTriggerContact }: { pinTriggerContact: string }) => {
  const REVEAL = "reveal";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { isMobile } = useViewport();

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
    <div className={`w-screen h-screen font-overpass`} id="education">
      <div
        className={`relative h-full items-center gap-20 mb-10 px-10 md:gap-10 w-screen flex-col flex lg:flex-row justify-evenly  ${REVEAL}`}
      >
        <div className={"flex items-center  flex-col pt-15  "}>
          <h1
            className={
              "text-2xl md:text-3xl text-center text-theme-red font-luckiest-guy mb-5 md:mb-15 "
            }
          >
            Let's build awesome things together!
          </h1>

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
              className="col-span-2 py-2 px-10 font-semibold mx-auto"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </div>
        </div>
        <div className="">
          <h1
            className={
              "text-2xl md:text-3xl text-theme-red font-luckiest-guy  lg:mb-15 "
            }
          >
            Get in touch with me!
          </h1>
          <div className="flex gap-5 justify-center justify-self-center py-5 ">
            <Link
              href="mailto:varindersingh14.vs@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail
                width={isMobile ? 36 : 60}
                height={isMobile ? 36 : 60}
                className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
              />
            </Link>
            <Link
              href="https://in.linkedin.com/in/varinder-singh-2317b8150"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                height={isMobile ? 36 : 60}
                width={isMobile ? 36 : 60}
                className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
              />
            </Link>
            <Link
              href="tel:+917696134521"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone
                height={isMobile ? 36 : 60}
                width={isMobile ? 36 : 60}
                className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
              ></Phone>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Contact);
