import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo } from '../typings';
import { urlFor } from '../sanity';
type Props = { pageInfo: PageInfo };

function About({ pageInfo }: Props) {
	return (
		<motion.div className="relative flex flex-col items-center justify-center px-10 mx-auto mb-28 md:text-left md:flex-row max-w-7xl top-6 md:top-0 lg:top-10">
			{/* Centered horizontally at the top of the motion.div */}
			<h3 className="absolute uppercase top-0 left-1/2 transform -translate-x-1/2 tracking-[20px] text-gray-500 text-2xl lg:text-4xl">
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
				className="flex-shrink-0 object-cover w-56 h-56 rounded-full md:mb-0 md:rounded-3xl md:w-64 md:h-96 xl:w-[500px] xl:h-[500px] mt-20"
			/>
			<div className="space-y-5 md:px-10 text">
				<h4 className="text-4xl font-semibold text-center ">
					Background and Skills
				</h4>
				<p className="text-sm lg:text-lg">{pageInfo?.backgroundInformation}</p>
			</div>
		</motion.div>
	);
}

export default About;
