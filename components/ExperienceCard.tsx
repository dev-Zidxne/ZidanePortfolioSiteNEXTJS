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
    <article className="flex flex-col  rounded-lg items-center  flex-shrink-0 w-[500px]  md:w-[600px] xl:w-[600px] xl:h-[700px]  snap-center bg-[#292929] p-3 hover:opacity-100 opacity-60 cursor-pointer transition-opacity duration-200 overflow-hidden ">
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

      <div className="flex flex-col w-screen p-12 space-y-2 md:w-fit ">
        <h4 className="text-2xl font-light lg:text-4xl">
          {experience.jobTitle}{" "}
        </h4>
        <p className="mt-1 text-2xl font-bold">{experience.company}</p>
        <div className="flex w-10 h-10 rounded-full">
          {experience.technologies.map((technology) => (
            <img
              key={technology._id}
              className="h-10 m-1 rounded-full"
              src={urlFor(technology.image).url()}
            />
          ))}
        </div>
        <p className="py-5 text-gray-300 uppercase">
          {new Date(experience.dateStarted).toDateString()} - {""}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="h-40 ml-5 space-y-4 text-sm list-disc lg:text-md w-80 ">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
