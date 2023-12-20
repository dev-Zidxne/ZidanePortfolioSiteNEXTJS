import React from 'react';
import { motion } from 'framer-motion';
import Skill from './Skill';
import { Skill as SkillType } from '../typings';
import { useMediaQuery } from 'react-responsive';
type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
	const isTabletOrMobile = useMediaQuery({ maxWidth: 716 });

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className="relative flex text-center md:text-left xl:flex-row  w-full xl:px-10 mx-auto items-center justify-center pt-24 bottom-20 mt-20"
		>
			<h2 className="absolute mb-5 top-6 text-center tracking-[20px] uppercase text-3xl font-semibold md:text-5xl text-gray-500 ml-6">
				Skills
			</h2>

			{!isTabletOrMobile && (
				<div className="grid grid-cols-6 gap-3 mt-12 overflow-hidden">
					{skills?.slice(0, skills.length / 2).map((skill) => (
						<Skill key={skill._id} skill={skill} />
					))}
					{skills?.slice(skills.length / 2, skills.length).map((skill) => (
						<Skill key={skill._id} skill={skill} directionLeft />
					))}
				</div>
			)}

			{isTabletOrMobile && (
				<div className="grid grid-cols-3 gap-3 overflow-hidden ">
					{skills?.slice(0, skills.length / 2).map((skill) => (
						<Skill key={skill._id} skill={skill} />
					))}
					{skills?.slice(skills.length / 2, skills.length).map((skill) => (
						<Skill key={skill._id} skill={skill} directionLeft />
					))}
				</div>
			)}

			{/* Lanscape Mode  */}
		</motion.div>
	);
}
