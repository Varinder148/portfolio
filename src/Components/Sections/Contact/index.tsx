import Linkedin from "@/app/Svgs/Linkedin";
import Mail from "@/app/Svgs/Mail";
import Phone from "@/app/Svgs/Phone";
import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import Tooltip from "@/Components/Tooltip";
import { useViewport } from "@/Providers/ViewportProvider";
import { THEME } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import React, { useRef, useState, useCallback } from "react";

const IconLinks = () => {
  const { isMobile } = useViewport();
  const mailRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const anim = gsap.from(
      [mailRef.current, linkedinRef.current, phoneRef.current],
      {
        opacity: 0,
        y: 20,
        ease: "back",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#education",
          start: `bottom 20%`,
        },
      },
    );
    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  });

  return (
    <div className="flex gap-5 justify-center justify-self-center ">
      <Tooltip text="varindersingh14.vs@gmail.com">
        <Link
          className="connect block"
          href="mailto:varindersingh14.vs@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send email to varindersingh14.vs@gmail.com"
          ref={mailRef}
        >
          <Mail
            width={isMobile ? 36 : 40}
            height={isMobile ? 36 : 40}
            className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
          />
        </Link>
      </Tooltip>

      <Link
        className="connect block"
        href="https://in.linkedin.com/in/varinder-singh-2317b8150"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Varinder Singh's LinkedIn profile"
        ref={linkedinRef}
      >
        <Linkedin
          height={isMobile ? 36 : 40}
          width={isMobile ? 36 : 40}
          className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
        />
      </Link>
      <Tooltip text="+1 647-366-7162">
        <Link
          href="tel:+16473667162"
          className="connect block"
          rel="noopener noreferrer"
          aria-label="Call +1 647-366-7162"
          ref={phoneRef}
        >
          <Phone
            height={isMobile ? 36 : 40}
            width={isMobile ? 36 : 40}
            className="hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"
          ></Phone>
        </Link>
      </Tooltip>
    </div>
  );
};

const Contact = ({ pinTriggerContact }: { pinTriggerContact: string }) => {
  const REVEAL = "reveal";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleIframeLoad = () => {
    if (!submitted) {
      setSubmitted(true);
      setEmail("");
      setName("");
      setMessage("");
      const tl = gsap.timeline();
      tl.to("#send", { text: "...", ease: "", duration: 0.5 })
        .to("#send", { text: "Sent", ease: "", duration: 0.5 })
        .to("#send", {
          delay: 2,
          text: "...",
          ease: "",
          duration: 0.5,
        })
        .to("#send", {
          text: "Send",
          duration: 0.5,
          ease: "",
        });
      formRef.current?.reset();
    }
  };

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

  const validateEmpty = useCallback((value: string) => {
    if (value?.length === 0) {
      return "This field cannot be empty.";
    }
  }, []);
  const validateEmail = useCallback((email: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "Invalid Email Address";
    }
  }, []);

  return (
    <section
      className={`w-screen overflow-hidden min-h-screen font-overpass`}
      id="education"
    >
      <div
        className={`pb-16 relative h-full items-center mb-10 px-10 pt-10  justify-center   w-screen flex-col flex lg:flex-row  ${REVEAL}`}
      >
        <h2 className="text-center flex flex-wrap w-full justify-start md:justify-center gap-x-2  text-5xl md:w-1/2 pb-5 md:text-[clamp(6rem,10vw,7rem)] font-luckiest-guy">
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
              className="bg-theme-green inline-block text-xl md:text-3xl font-montserrat p-2 text-theme-ivory"
            >
              together!
            </strong>
          </h3>
          <IconLinks></IconLinks>

          <div>
            <div className="text-sm font-normal font-overpass text-theme-green text-center mb-2">
              Note: Only one message per session is allowed
            </div>
            <form
              className={"grid grid-cols-2 gap-2 md:gap-5  "}
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfZOZqPUED1FCGx3OntVoE8yqVxcGsMSmceiCxuNN16U1Ohsg/formResponse"
              method="POST"
              target="hidden_iframe"
              ref={formRef}
            >
              <TextField
                label={"Email address:"}
                value={email}
                type="email"
                onChange={(value: string) => setEmail(value)}
                validate={validateEmail}
                name="entry.1195739850"
              />
              <TextField
                label={"Name:"}
                value={name}
                onChange={(value: string) => setName(value)}
                validate={validateEmpty}
                name="entry.939547033"
              />
              <TextField
                label={"Your Message"}
                value={message}
                className="col-span-2"
                onChange={(value: string) => setMessage(value)}
                multiline
                name="entry.1570976079"
              />
              <Button
                className="col-span-2 py-2 px-10 min-w-[300px] font-semibold mx-auto"
                color={THEME.GREEN}
                type="submit"
                disabled={
                  !!(validateEmail(email) || validateEmpty(name)) || submitted
                }
              >
                <div className="block" id="send" aria-live="polite">
                  Send
                </div>
              </Button>
            </form>
            <iframe
              name="hidden_iframe"
              style={{ display: "none" }}
              onLoad={handleIframeLoad}
              title="hidden_iframe"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
          <div className=" bg-theme-black p-2 md:px-10 md:py-5 absolute text-center text-sm md:text-md w-screen md:w-max md:rounded-t-4xl left-1/2 -translate-x-1/2 text-theme-ivory bottom-0">
            &copy; 2025 Varinder Singh. Coded with coffee, chaos & a bit of
            magic ✨.
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
