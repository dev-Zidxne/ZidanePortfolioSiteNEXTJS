import { MotionConfig } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../typings";
import { urlFor } from "../sanity";
import { useMediaQuery } from "react-responsive";
type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex flex-col  rounded-3xl items-center flex-shrink-0 w-[300px] h-[550px] lg-[500px]  md:w-[600px] xl:w-[600px] xl:h-[700px]  snap-center bg-[#292929] p-3 ml-6 hover:opacity-100 opacity-60 cursor-pointer transition-opacity duration-200 overflow-hidden ">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full xl:w-[200px] object-cover object-center xl:h-[200px]"
        src={urlFor(experience?.companyImage).url()}
      />

      <div className="flex flex-col w-screen p-10 space-y-2 md:w-fit ">
        <h4 className="text-2xl font-light text-center lg:text-4xl lg:ml-0">
          {experience.jobTitle}{" "}
        </h4>
        <p className="mt-1 ml-5 text-2xl font-bold text-center ">
          {experience.company}
        </p>
        <div className="flex h-12 m-5 overflow-scroll rounded-full lg:overflow-hidden md:overflow-hidden ">
          {experience.technologies.map((technology) => (
            <img
              key={technology._id}
              className="h-10 m-1 rounded-full"
              src={urlFor(technology.image).url()}
            />
          ))}
        </div>
        <p className="py-2 text-center text-gray-300 uppercase lg:text-left">
          {new Date(experience.dateStarted).toDateString()} - {""}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="p-2 space-y-1 text-xs list-disc h-36 ml-7 lg:text-base">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
