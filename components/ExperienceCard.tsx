import { MotionConfig } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
type Props = {};

function ExperienceCard({}: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[520px] md:w-[600px] xl:w-[900px]">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-32 h-32 rounded-full xl:w-[200px] object-cover"
        src="https://media-exp1.licdn.com/dms/image/C5603AQFwxOmluAqhbw/profile-displayphoto-shrink_800_800/0/1661888341256?e=1671062400&v=beta&t=822RToVHXbUMClvfhlLPasZKt51ZxQK9LXf0wIa1t1k"
      />
      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">CEO OF </h4>
        <p className="mt-2 text-2xl font-bold">Zidane</p>
        <div className="w-10 h-10 rounded-full">
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
        </div>
        <p> Started.. Ended...</p>
        <ul className="ml-5 space-y-4 text-lg list-disc">
          <li>Summary Points</li>
          <li>Summary Points</li>
          <li>Summary Points</li>
          <li>Summary Points</li>
          <li>Summary Points</li>
        </ul>
      </div>
    </article>
  );
}
export default ExperienceCard;
