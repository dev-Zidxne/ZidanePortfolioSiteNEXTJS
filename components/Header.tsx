import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Social } from "../typings";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-start justify-between pl-5 pr-5 mx-auto max-w-7xl xl-items-center backdrop-blur-sm">
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center"
      >
        {" "}
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            bgColor="transparent"
            fgColor="currentColor"
            className="text-[#808080ff] transition cursor-pointer hover:text-white"
          />
        ))}
      </motion.div>
      <Link href="#contact">
        <motion.div
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center text-gray-300 cursor-pointer "
        >
          <div className="tippy-tooltip">
            <SocialIcon
              className="text-[#808080ff] transition cursor-pointer hover:text-white "
              network="email"
              fgColor="currentColor"
              bgColor="transparent"
            />
          </div>
          <p className="hidden text-sm text-gray-400 uppercase md:inline-flex">
            Get In Touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}
