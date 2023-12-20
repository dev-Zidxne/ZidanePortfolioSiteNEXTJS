import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { Experience } from '../typings';
type Props = {
	experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className="relative flex flex-col items-center  px-5 mx-auto md:text-left md:flex-row lg:max-w-full justify-evenly lg:top-24 "
		>
			<h3 className=" uppercase lg:top-8  ml-6 tracking-[20px] text-gray-500 text-2xl lg:text-4xl top-1 font-semibold">
				Experience
			</h3>

			<div className="flex w-full p-5 space-x-5  overflow-x-scroll snap-mandatory snap-x scrollbar-thin  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 hover:scrollbar ">
				{experiences?.map((experience) => (
					<ExperienceCard key={experience._id} experience={experience} />
				))}
			</div>
		</motion.div>
	);
}
