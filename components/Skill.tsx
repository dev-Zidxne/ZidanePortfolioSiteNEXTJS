import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../typings';
import { urlFor } from '../sanity';

type Props = {
	skill?: Skill;
	directionLeft?: boolean;
};

function Skill({ directionLeft, skill }: Props) {
	return (
		<div className="group m-auto cursor-pointer overflow-hidden relative flex justify-center p-4 bg-[#292929] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
			{skill?.image && (
				<motion.img
					initial={{ x: directionLeft ? -50 : 50, opacity: 0 }}
					transition={{ duration: 1 }}
					whileInView={{ opacity: 1, x: 0 }}
					src={urlFor(skill.image).url()}
					className="object-cover w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full"
				/>
			)}
		</div>
	);
}

export default Skill;
