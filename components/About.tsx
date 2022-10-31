import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";
type Props = { pageInfo: PageInfo };

function About({ pageInfo }: Props) {
  return (
    <motion.div className="relative flex flex-col items-center h-screen px-10 mx-auto md:text-left md:flex-row max-w-7xl justify-evenly">
      <h3 className="absolute top-16 ml-6 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        src={urlFor(pageInfo?.profilePic).url()}
        className="flex-shrink-0 object-cover w-56 h-56 rounded-full md:mb-0 md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[600px] mt-10"
      />
      <div className="px-0 space-y-10 md:px-10">
        <h4 className="text-4xl font-semibold">Background and Skills</h4>
        <p className="text-base">{pageInfo?.backgroundInformation}</p>
      </div>
    </motion.div>
  );
}

export default About;
