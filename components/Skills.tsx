import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "../typings";
import { useMediaQuery } from "react-responsive";
type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 716 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 h-screen xl:space-y-0 mx-auto items-center justify-center  "
    >
      <h3 className="absolute  uppercase top-6  ml-6 tracking-[20px] text-gray-500 text-2xl lg:top-32 lg:text-4xl sm:top-20">
        Skills
      </h3>

      {!isTabletOrMobile && (
        <div className="grid grid-cols-6 gap-3 mt-12">
          {skills?.slice(0, skills.length / 2).map((skill) => (
            <Skill key={skill._id} skill={skill} />
          ))}
          {skills?.slice(skills.length / 2, skills.length).map((skill) => (
            <Skill key={skill._id} skill={skill} directionLeft />
          ))}
        </div>
      )}

      {isTabletOrMobile && (
        <div className="grid grid-cols-3 gap-3 overflow-y-scroll ">
          {skills?.slice(0, skills.length / 2).map((skill) => (
            <Skill key={skill._id} skill={skill} />
          ))}
          {skills?.slice(skills.length / 2, skills.length).map((skill) => (
            <Skill key={skill._id} skill={skill} directionLeft />
          ))}
        </div>
      )}

      {/* Lanscape Mode  */}
    </motion.div>
  );
}
