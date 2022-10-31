import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "../typings";
import { useMediaQuery } from "react-responsive";
type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 558 });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen xl:space-y-0 mx-auto items-center justify-center "
    >
      <h3 className="absolute top-16 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      {isTabletOrMobile && (
        <h3 className="absolute top-24  tracking-[3px] text-gray-500 text-sm m-1">
          Tap on a skill for current proficiency.
        </h3>
      )}
      {!isTabletOrMobile && (
        <h3 className="absolute top-32 tracking-[3px] text-gray-500 text-xl m-1">
          Hover over a skill for current proficiency.
        </h3>
      )}
      {!isTabletOrMobile && (
        <div className="grid grid-cols-4 gap-5">
          {skills?.slice(0, skills.length / 2).map((skill) => (
            <Skill key={skill._id} skill={skill} />
          ))}
          {skills?.slice(skills.length / 2, skills.length).map((skill) => (
            <Skill key={skill._id} skill={skill} directionLeft />
          ))}
        </div>
      )}

      {isTabletOrMobile && (
        <div className="grid grid-cols-3 gap-3 mt-12 overflow-y-scroll s overscroll-y-none">
          {skills?.slice(0, skills.length / 2).map((skill) => (
            <Skill key={skill._id} skill={skill} />
          ))}
          {skills?.slice(skills.length / 2, skills.length).map((skill) => (
            <Skill key={skill._id} skill={skill} directionLeft />
          ))}
        </div>
      )}
    </motion.div>
  );
}
