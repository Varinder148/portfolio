import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Contact = ({ pinTriggerContact }: { pinTriggerContact: string }) => {
  const REVEAL = "reveal";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollbindTrigger: {
        bindTrigger: `.${pinTriggerContact}`,
        start: "top",
        markers: true,
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
        className={`relative h-full items-center gap-20 my-10 px-10 md:gap-10 w-screen flex-col flex lg:flex-row justify-start md:justify-evenly  ${REVEAL}`}
      >
        <div className={"flex items-center flex-col pt-15  "}>
          <h1
            className={
              "text-xl md:text-3xl text-theme-red font-luckiest-guy mb-5 md:mb-15 "
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
              "text-xl md:text-3xl text-theme-red font-luckiest-guy mb-5 md:mb-15 "
            }
          >
            Get in touch with me!
          </h1>
          <div className="flex lg:gap-5 mb-5 text-5xl justify-self-center ">
            <Link
              href="mailto:varindersingh14.vs@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdEmail className="text-theme-black hover:text-theme-red" />
            </Link>
            <Link
              href="https://in.linkedin.com/in/varinder-singh-2317b8150"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-theme-black hover:text-theme-red" />
            </Link>
            <Link
              href="tel:+917696134521"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquarePhone className="text-theme-black hover:text-theme-red" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
