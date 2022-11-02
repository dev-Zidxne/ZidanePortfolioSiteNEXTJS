import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../typings";
type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col items-center h-screen px-10 mx-auto md:text-left md:flex-row justify-evenly "
    >
      <h3 className="absolute uppercase lg:top-8  ml-6 tracking-[20px] text-gray-500 text-2xl lg:text-4xl top-3">
        Experience
      </h3>
      <div className="flex w-full p-10 space-x-5 overflow-x-scroll snap-mandatory snap-x scrollbar-thin  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 hover:scrollbar">
        {experiences?.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </motion.div>
  );
}
