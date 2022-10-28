import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";

type Props = {};

function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: ["My name is Zidane Innis", "React.JS Developer"],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8 overflow-hidden text-center">
      <BackgroundCircles />
      <img
        className="object-cover w-32 h-32 mx-auto rounded-full"
        src="https://media-exp1.licdn.com/dms/image/D4E03AQHdJZFLTFQDHQ/profile-displayphoto-shrink_800_800/0/1665970228383?e=1671667200&v=beta&t=wKKVw1mofVg899wMOc5pVB5suTg4nD0Vz8PWKdjtz6w"
        alt=""
      />
      <div className="z-20">
        <h2 className="pb-2 text-sm uppercase tracking-[15px] text-gray-500 ">
          Software Engineer
        </h2>
        <h1 className="text-5xl font-semibold lg:text-6xl scroll-px10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>
      <div className="pt-5 ">
        <Link href="#about">
          <button className="heroButton">About</button>
        </Link>
        <Link href="#experience">
          <button className="heroButton">Experience</button>
        </Link>
        <Link href="#skills">
          <button className="heroButton">Skills</button>
        </Link>
        <Link href="#projects">
          <button className="heroButton">Projects</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
