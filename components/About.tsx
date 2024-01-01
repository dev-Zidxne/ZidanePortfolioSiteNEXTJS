import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo } from '../typings';
import { urlFor } from '../sanity';

type Props = { pageInfo: PageInfo };

function About({ pageInfo }: Props) {
	return (
		<motion.div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-10 mt-6 md:mt-10 lg:mt-14 text-center md:text-left  pt-16 md:pt-24 mb-10">
			{/* Modern card-like layout with shadow */}
			<div className="bg-[#292929] shadow-lg rounded-2xl p-6 md:p-10 lg:p-12 max-w-4xl mx-auto">
				<motion.img
					initial={{ x: -200, opacity: 0 }}
					transition={{ duration: 1.2 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					src={urlFor(pageInfo?.profilePic).url()}
					className="w-32 h-32 md:w-48 md:h-48 lg:w-72 lg:h-96 object-cover mx-auto rounded-full md:rounded-xl" // Changed here
				/>
				<h3 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-500  tracking-[20px] uppercase text-3xl">
					About
				</h3>
				<p className="mt-3 text-sm md:text-base lg:text-lg text-white">
					{pageInfo?.backgroundInformation}
				</p>
			</div>
		</motion.div>
	);
}

export default About;
