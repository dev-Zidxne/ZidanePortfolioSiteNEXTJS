import React, {
  ReactComponentElement,
  ReactElement,
  ReactEventHandler,
  ReactHTML,
  useRef,
  useState,
} from "react";
import {
  DevicePhoneMobileIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../typings";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

type Props = {
  pageInfo: PageInfo;
};

function ContactMe({ pageInfo }: Props) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 558 });

  const [input, setInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isdisabled, setIsDisabled] = useState(true);

  const onChange = (e: any) => {
    setInput((prevState) => e.target.value);
    if (e.target.value.trim().length < 8) {
      // Checking the length of the input
      setIsDisabled(true); // Disabling the button if length is < 1
    } else {
      setIsDisabled(false);
    }
  };
  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_c2i43fi",
        "template_2hcql09",
        e.currentTarget,
        "tDGyBqf16EkmbUFVk"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.currentTarget.reset();
  };

  return (
    <div className="relative bottom-0 flex items-center justify-center text-center md:text-left md:flex-row top-6">
      <h3 className="absolute uppercase top-8  ml-6 tracking-[20px] text-gray-500 text-2xl lg:text-4xl">
        Contact
      </h3>

      <div className="flex flex-col ">
        {!isTabletOrMobile && (
          <h4 className="mt-20 font-semibold text-center text-md ">
            Get in Touch.{" "}
            <span className="decoration-[#F7AB0A]/50 underline">
              Lets Talk:
            </span>
          </h4>
        )}
        {isTabletOrMobile && (
          <h4 className="mt-24 text-2xl font-semibold text-center ">
            Get in Touch.{" "}
            <span className="decoration-[#F7AB0A]/50 underline">
              Lets Talk:
            </span>
          </h4>
        )}

        {isTabletOrMobile && (
          <div className="p-5 mt-[-10px] ">
            <div className="flex items-center space-x-5">
              <DevicePhoneMobileIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
              <p className="text-md">{pageInfo?.phoneNumber}</p>
            </div>
            <div className="flex items-center space-x-5">
              <EnvelopeIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
              <p className="text-md">{pageInfo?.email}</p>
            </div>
            <div className="flex items-center space-x-5">
              <MapPinIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
              <p className="text-md">{pageInfo?.address}</p>
            </div>
          </div>
        )}
        {!isTabletOrMobile && (
          <div className="p-5 space-y-10 ">
            <div className="flex items-center space-x-5">
              <DevicePhoneMobileIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
              <p className="text-2xl">{pageInfo?.phoneNumber}</p>
            </div>
            <div className="flex items-center space-x-5">
              <EnvelopeIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
              <p className="text-2xl">{pageInfo?.email}</p>
            </div>
            <div className="flex items-center space-x-5">
              <MapPinIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
              <p className="text-2xl">{pageInfo?.address}</p>
            </div>
          </div>
        )}

        <form
          onSubmit={sendEmail}
          className="flex flex-col w-screen p-5 space-y-2 md:w-fit h-96"
        >
          {!isTabletOrMobile && (
            <div className="space-x-2 ">
              <input
                onChange={onChange}
                name="name"
                value={input.name}
                className="contactInput"
                placeholder="Name"
                type="text"
              />
              <input
                onChange={onChange}
                name="email"
                value={input.email}
                className="contactInput"
                placeholder="Email"
                type="email"
              />
            </div>
          )}
          {isTabletOrMobile && (
            <div className="flex flex-col space-y-2 ">
              <input
                onChange={onChange}
                name="name"
                value={input.name}
                className="contactInput"
                placeholder="Name"
                type="text"
              />
              <input
                onChange={onChange}
                name="email"
                value={input.email}
                className="contactInput"
                placeholder="Email"
                type="email"
              />
            </div>
          )}

          <input
            onChange={onChange}
            name="subject"
            value={input.subject}
            className="contactInput"
            placeholder="Subject"
          ></input>
          <textarea
            onChange={onChange}
            className="contactInput"
            name="message"
            value={input.message}
            placeholder="Message..."
          ></textarea>

          <button
            type="submit"
            className="bg-[#F7AB0A] py-5   rounded-md  text-black font-bold hover:opacity-80 transition-all duration-500  "
            disabled={isdisabled}
          >
            Send Mail
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
