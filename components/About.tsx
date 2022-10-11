import React from "react";
import { motion } from "framer-motion";
type Props = {};

function About({}: Props) {
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
        src="https://media-exp1.licdn.com/dms/image/C5603AQFwxOmluAqhbw/profile-displayphoto-shrink_800_800/0/1661888341256?e=1671062400&v=beta&t=822RToVHXbUMClvfhlLPasZKt51ZxQK9LXf0wIa1t1k"
        className="flex-shrink-0 object-cover w-56 h-56 rounded-full md:mb-0 md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[600px] mt-10"
      />
      <div className="px-0 space-y-10 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-white/50">little</span>{" "}
          background
        </h4>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto magnam
          non, minima modi dolores enim accusantium, nemo quo doloremque iste
          sapiente tenetur tempore quia explicabo! Quas odio vitae explicabo
          excepturi quae adipisci perspiciatis aspernatur repellat, officia ex
          inventore reiciendis! Repellat nemo necessitatibus suscipit culpa
          asperiores facilis aut ipsam totam dolor!
        </p>
      </div>
    </motion.div>
  );
}

export default About;
