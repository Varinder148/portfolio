import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState } from "react";

const Contact: React.FC = () => {
  const REVEAL = "reveal";
  const TRIGGER = "trigger";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${TRIGGER}`, // Element that triggers the animation
        start: "top", // Animation starts when the top of '.content' reaches 80% of the viewport height
        scrub: true, // Smooth scrubbing
      },
    });

    tl.to(`.${REVEAL}`, {
      opacity: 1,
      position: "fixed",
      top: 0,
      left: 0,
      duration: 1,
      stagger: 0.2, // Delay between animations of each item
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
    <div className={"w-screen h-screen " + TRIGGER} id="education">
      <div
        className={
          "relative items-center flex-col  w-screen h-screen opacity-0   " +
          REVEAL
        }
      >
        <div className={"flex items-center flex-col pt-15 w-screen h-screen  "}>
          <h1 className={"text-8xl text-theme-red font-meddon mb-25  "}>
            Contact me
          </h1>
          <div className={"grid grid-cols-2 w-1/2 gap-5  "}>
            <TextField
              label={"Your Email"}
              value={email}
              onChange={(value: string) => setEmail(value)}
              validate={validateEmail}
            />
            <TextField
              label={"Your Name"}
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
              className="col-span-2 w-[400px] mx-auto"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
          <div className={"grid grid-cols-2 gap-5 mt-auto mb-5   "}>
            <div className="text-theme-2xl text-theme-red col-span-2 text-center font-meddon">
              or, Contact me directly
            </div>
            <div>M: +91 7696134521</div>

            <a
              className="text-theme-sandy hover:text-theme-red font-semibold"
              href="mailto:varindersingh14.vs@gmail.com"
            >
              Email: varindersingh14.vs@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
