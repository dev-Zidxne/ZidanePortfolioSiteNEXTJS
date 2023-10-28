import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../typings';
import { urlFor } from '../sanity';

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
		<article className="flex flex-col items-center flex-shrink-0 w-full md:w-[300px] lg:w-[500px] p-3 ml-6 hover:opacity-100 opacity-60 transition-opacity duration-200 rounded-3xl bg-[#292929]">
			{/* Reduced margin-top and adjusted sizes */}
			<motion.img
				// ... (keep your framer-motion attributes)
				className="w-24 h-24 rounded-full object-cover object-center xl:w-[200px] xl:h-[200px]"
				src={urlFor(experience?.companyImage)?.url()}
			/>
			{/* Reduced padding and flex dimensions */}
			<div className="flex flex-col items-center space-y-1 p-4 md:w-full">
				{/* Adjusted margins and text sizes */}
				<h4 className="text-xl font-light text-center lg:text-2xl">
					{experience.jobTitle}
				</h4>
				<p className="text-xl font-bold text-center">{experience.company}</p>
				{/* Simplified layout */}
				<div className="flex flex-wrap justify-center">
					{experience?.technologies
						? experience.technologies.map(
								(technology) =>
									technology?.image && (
										<img
											key={technology._id}
											className="h-8 m-1 rounded-full"
											src={urlFor(technology.image).url()}
										/>
									)
						  )
						: null}
				</div>
				{/* Adjusted layout and styles */}
				<p className="py-1 text-center text-gray-300 uppercase">
					{employmentTimeStarted} -{' '}
					{experience.isCurrentlyWorkingHere ? 'Present' : employmentTimeEnded}
				</p>
				{/* Removed fixed height */}
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
