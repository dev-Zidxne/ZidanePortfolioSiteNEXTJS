import React from "react";
import { SocialIcon } from "react-social-icons";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-start justify-between p-5 mx-auto max-w-7xl xl-items-center">
      <div className="flex flex-row items-center">
        {" "}
        <SocialIcon
          url="https://www.linkedin.com/feed/"
          bgColor="transparent"
          fgColor="gray"
        ></SocialIcon>
        <SocialIcon
          url="https://github.com/zidxne1"
          bgColor="transparent"
          fgColor="gray"
        ></SocialIcon>
      </div>

      <div className="flex flex-row items-center text-gray-300 cursor-pointer ">
        <SocialIcon
          className="cursor-pointer"
          network="email"
          fgColor="gray"
          bgColor="transparent"
        />
        <p className="hidden text-sm text-gray-400 uppercase md:inline-flex">
          Get In Touch
        </p>
      </div>
    </header>
  );
}
