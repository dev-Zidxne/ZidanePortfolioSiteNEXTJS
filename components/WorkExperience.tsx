import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
type Props = {};

export default function WorkExperience({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col items-center h-screen px-10 mx-auto md:text-left md:flex-row max-w-7xl justify-evenly"
    >
      <h3 className="absolute top-16 ml-6 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>
      <div className="flex w-full p-10 space-x-5 overflow-x-scroll snap-mandatory snap-x">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </motion.div>
  );
}