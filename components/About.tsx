import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo } from '../typings';
import { urlFor } from '../sanity';
import Image from 'next/image'; // Import Next.js Image component

type Props = { pageInfo: PageInfo };

function About({ pageInfo }: Props) {
	return (
		<motion.div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-10 mt-6 md:mt-10 lg:mt-14 text-center md:text-left pt-16 md:pt-24 mb-10">
			<div className="bg-[#292929] shadow-lg rounded-2xl p-6 md:p-10 lg:p-12 max-w-4xl mx-auto">
				<motion.div
					initial={{ x: -200, opacity: 0 }}
					transition={{ duration: 1.2 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<Image
						src={urlFor(pageInfo?.profilePic).url()}
						alt="Zidane Innis About Section Profile Picture"
						width={288}
						height={384}
						className="rounded-xl object-cover mx-auto"
					/>
				</motion.div>
				<h3 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-500  tracking-[20px] uppercase ">
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
