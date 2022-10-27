import React from "react";
import {
  DevicePhoneMobileIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactMe({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:zidaneinnis@gmail?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  return (
    <div className="relative flex flex-col items-center h-screen max-w-2xl p-10 mx-auto text-center md:text-left md:flex-row justify-evenly">
      <h3 className="absolute uppercase top-24 tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>
      <div className="flex flex-col space-y-10 ">
        <h4 className="text-4xl font-semibold text-center">
          I have just you need.{" "}
          <span className="decoration-[#F7AB0A]/50 underline">Let's Talk</span>
        </h4>
        <div className="space-y-10">
          <div className="flex items-center space-x-5">
            <DevicePhoneMobileIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
            <p className="text-2xl">+18763162975</p>
          </div>
          <div className="flex items-center space-x-5">
            <EnvelopeIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
            <p className="text-2xl">Email Me</p>
          </div>
          <div className="flex items-center space-x-5">
            <MapPinIcon className="h-7 w-7 text-[#F7AB0A] animate-pulse" />
            <p className="text-2xl">Montego Bay, Jamaica</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-auto space-y-2 w-fit"
        >
          <div className="flex space-x-2">
            <input
              {...register("name")}
              className="contactInput"
              placeholder="Name"
              type="text"
            />
            <input
              {...register("email")}
              className="contactInput"
              placeholder="Email"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            className="contactInput"
            placeholder="Subject"
          ></input>
          <textarea
            className="contactInput"
            name=""
            placeholder="Message..."
          ></textarea>
          <button
            type="submit"
            className="bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold hover:opacity-80 transition-all duration-500 "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
