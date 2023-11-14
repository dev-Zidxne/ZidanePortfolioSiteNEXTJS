import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo } from '../typings';
import { urlFor } from '../sanity';
type Props = { pageInfo: PageInfo };

function About({ pageInfo }: Props) {
	return (
		<motion.div className="relative flex flex-col items-center justify-center px-10 mx-auto mb-28 md:text-left md:flex-row max-w-7xl top-6 md:top-0 lg:top-10 h-screen">
			{/* Centered horizontally at the top of the motion.div */}

			<h3 className="absolute mb-5 top-24 text-center tracking-[20px] uppercase text-3xl font-bold md:text-5xl text-gray-500">
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
			<div className="space-y-5 md:px-10 ">
				<h4 className="text-4xl font-semibold text-center ">
					Background and Skills
				</h4>
				<p className="text-sm lg:text-lg">{pageInfo?.backgroundInformation}</p>
			</div>
		</motion.div>
	);
}

export default About;
