import React, { useState } from "react";
import {
  DevicePhoneMobileIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { PageInfo } from "../typings";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

type Props = {
  pageInfo: PageInfo;
};

function ContactMe({ pageInfo }: Props) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 558 });
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjectValid, setSubjectValid] = useState(false);
  const [message, setMessage] = useState("");
  const [messageValid, setMessageValid] = useState(false);

  const [isdisabled, setIsDisabled] = useState(true);

  function validateNameInterceptor(e: any) {
    setName(e.target.value);

    if (e.target.value.length > 2) {
      setNameValid(true);
      return true;
    } else {
      setNameValid(false);

      return false;
    }
  }

  function validateEmailInterceptor(e: any) {
    setEmail(e.target.value);
    const filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    let pass = String(e.target.value).search(filter) != -1;
    if (pass) {
      setEmailValid(true);
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  }

  function validateSubjectInterceptor(e: any) {
    setSubject(e.target.value);

    if (e.target.value.length > 2 && e.target.value.length < 56) {
      setSubjectValid(true);
      return true;
    } else {
      setSubjectValid(false);
      return false;
    }
  }
  function validateMessageInterceptor(e: any) {
    setMessage(e.target.value);

    if (e.target.value.length < 4000) {
      setMessageValid(true);
      return true;
    } else {
      setMessageValid(false);
      return false;
    }
  }
  const [input, setInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // const sendEmail = (e: any) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_c2i43fi",
  //       "template_2hcql09",
  //       e.currentTarget,
  //       "tDGyBqf16EkmbUFVk"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   e.currentTarget.reset();
  // };
  const onChange = (e: any) => {
    setInput((prevState) => e.target.value);
    if (emailValid && nameValid && subjectValid && messageValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const sendEmail = (e: any) => {
    if (emailValid && nameValid && subjectValid && messageValid) {
      emailjs
        .sendForm(
          "service_c2i43fi",
          "template_2hcql09",
          e.currentTarget,
          "tDGyBqf16EkmbUFVk"
        )
        .then(() => {
          alert("Message sent. Thank you.");
        })
        .catch(() => {
          alert("Message not sent. Please check internet connection.");
        });
    } else if (!nameValid) {
      alert("10 digit dialing");
    }
    e.currentTarget.reset();
    setIsDisabled(true);
  };

  return (
    <div className="relative bottom-0 flex items-center justify-center pb-20 text-center md:text-left md:flex-row top-6 lg:top-20">
      <h3 className="absolute uppercase top-8  ml-6 tracking-[20px] text-gray-500 text-2xl lg:text-4xl ">
        Contact
      </h3>

      <div className="flex flex-col ">
        {!isTabletOrMobile && (
          <h4 className="mt-24 font-semibold text-center text-md ">
            Get in Touch{" "}
            {/* <span className="decoration-[#F7AB0A]/50 underline">
              Lets Talk:
            </span> */}
          </h4>
        )}
        {isTabletOrMobile && (
          <h4 className="mt-24 text-2xl font-semibold text-center ">
            Get in Touch{" "}
            {/* <span className="decoration-[#F7AB0A]/50 underline">
              Lets Talk:
            </span> */}
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
          onChange={onChange}
          onSubmit={sendEmail}
          className="flex flex-col w-screen p-5 space-y-2 md:w-fit "
        >
          {!isTabletOrMobile && (
            <div className="space-x-2 ">
              <input
                onChange={(e) => {
                  validateNameInterceptor(e);
                }}
                value={input.name}
                name="name"
                className="rounded-lg contactInput"
                placeholder="Name"
                type="text"
              />
              <input
                onChange={(e) => {
                  validateEmailInterceptor(e);
                }}
                name="email"
                value={input.email}
                className="rounded-lg contactInput"
                placeholder="Email"
                type="email"
              />
            </div>
          )}
          {isTabletOrMobile && (
            <div className="flex flex-col space-y-2 ">
              <input
                onChange={(e) => {
                  validateNameInterceptor(e);
                }}
                name="name"
                value={input.name}
                className="rounded-lg contactInput"
                placeholder="Name"
                type="text"
              />
              <input
                onChange={(e) => {
                  validateEmailInterceptor(e);
                }}
                name="email"
                value={input.email}
                className="rounded-lg contactInput"
                placeholder="Email"
                type="email"
              />
            </div>
          )}

          <input
            onChange={(e) => {
              validateSubjectInterceptor(e);
            }}
            name="subject"
            value={input.subject}
            className="rounded-lg contactInput"
            placeholder="Subject"
          ></input>
          <textarea
            onChange={(e) => {
              validateMessageInterceptor(e);
            }}
            value={input.message}
            className="rounded-lg contactInput"
            name="message"
            placeholder="Message..."
          ></textarea>

          <button
            type="submit"
            className="bg-[#F7AB0A] py-5   rounded-3xl  text-black font-bold hover:opacity-80 transition-all duration-500  "
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
