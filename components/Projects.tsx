import React from "react";
import { motion } from "framer-motion";
import { Project } from "../typings";
import { url } from "inspector";
import { urlFor } from "../sanity";
import Link from "next/link";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1.5,
      }}
      className="relative flex flex-col items-center h-screen px-10 mx-auto md:text-left md:flex-row max-w-7xl justify-evenly "
    >
      <h3 className="absolute uppercase top-24 tracking-[20px] text-gray-500 text-2xl ml-6 lg:text-4xl">
        Projects
      </h3>
      <div className="relative z-20 flex w-full overflow-y-hidden snap-x snap-mandatory scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 bottom-32">
        {projects.map((project, i) => (
          <div
            key={project.toString()}
            className="flex flex-col items-center justify-center flex-shrink-0 w-screen h-screen p-20 space-y-5 snap-center md:p-44"
          >
            <div className="flex-shrink-0 object-cover w-24 h-24   md:mb-0 md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[400px] mt-10 cursor-pointer hover:opacity-80 bg-transparent-400 transition">
              <Link href={project.linkToBuild}>
                <a target="_blank">
                  <motion.img
                    initial={{
                      y: -300,
                      opacity: 0,
                    }}
                    transition={{ duration: 1.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    src={urlFor(project?.image).url()}
                    alt=""
                    className="flex-shrink-0 object-cover w-24 h-24   md:mb-0 md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[400px] mt-10 cursor-pointer  "
                  />
                </a>
              </Link>
            </div>
            <div className="max-w-6xl px-0 space-y-10 md:px-10">
              <h4 className="text-4xl font-semibold text-center">
                <span className="underline decoration-[#F7AB0A]/50 text-sm lg:text-lg ">
                  Case Study {i + 1} of {projects.length}: {project?.title}
                </span>{" "}
              </h4>{" "}
              <div className="flex items-center justify-center space-x-2">
                {project?.technologies.map((technology) => (
                  <img
                    className="h-10 m-1 rounded-full"
                    key={technology._id}
                    src={urlFor(technology.image).url()}
                    alt=""
                  />
                ))}
              </div>
              <p className="text-lg text-center md:text-left ">
                {project?.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full absolute top-[20%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
