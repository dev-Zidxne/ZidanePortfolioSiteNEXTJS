import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../typings';
import { urlFor } from '../sanity';
import Image from 'next/image';

type Props = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
	const employmentTimeStarted = new Date(
		experience.dateStarted
	).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	const employmentTimeEnded = new Date(experience.dateEnded).toLocaleDateString(
		'en-US',
		{
			month: 'long',
			year: 'numeric',
		}
	);

	return (
		<article className="flex flex-col items-center flex-shrink-0 w-full md:w-[300px] lg:w-[500px] p-3 ml-6 hover:opacity-100 opacity-60 transition-opacity duration-200 rounded-3xl bg-[#292929] ">
			<motion.div>
				<Image
					src={urlFor(experience?.companyImage)?.url()}
					width={120}
					height={120}
					className="object-cover object-center rounded-full w-24 h-24   xl:w-[200px] xl:h-[200px]"
					alt="Zidane Innis past company experience image"
				/>
			</motion.div>
			<div className="flex flex-col items-center space-y-1 p-4 md:w-full">
				<h4 className="text-xl font-light text-center lg:text-2xl">
					{experience.jobTitle}
				</h4>
				<p className="text-xl font-bold text-center">{experience.company}</p>
				<div className="flex flex-wrap justify-center gap-2">
					{experience?.technologies
						? experience.technologies.map(
								(technology) =>
									technology?.image && (
										<Image
											width={45}
											height={45}
											key={technology._id}
											className="h-8 m-2 rounded-full"
											src={urlFor(technology.image).url()}
											alt="Zidane Innis Technology Skills Icons"
										/>
									)
						  )
						: null}
				</div>
				<p className="py-1 text-center text-gray-300 uppercase">
					{employmentTimeStarted} -
					{experience.isCurrentlyWorkingHere ? 'Present' : employmentTimeEnded}
				</p>
				<div className="overflow-auto w-full h-[300px] md:h-[200px]">
					<ul className="pl-5 space-y-0.5 text-sm text-left list-disc ">
						{experience?.points
							? experience.points.map((point, i) => <li key={i}>{point}</li>)
							: null}
					</ul>
				</div>
			</div>
		</article>
	);
}
