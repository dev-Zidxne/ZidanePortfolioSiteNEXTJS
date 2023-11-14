import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../typings';

import { urlFor } from '../sanity';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

type Props = {
	projects: Project[];
};

export default function Projects({ projects }: Props) {
	const isTabletOrMobile = useMediaQuery({ maxWidth: 558 });
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			whileInView={{ opacity: 1 }}
			transition={{
				duration: 1.5,
			}}
			className="relative w-screen h-screen flex items-center justify-center pb-20 text-center md:text-left md:flex-row top-6 lg:top-20 p-10 "
		>
			<h3
				className={`absolute top-8 uppercase ml-6 tracking-[20px] text-gray-500 ${
					isTabletOrMobile ? 'text-2xl' : 'text-4xl'
				}`}
			>
				Projects
			</h3>
			<h3 className="absolute text-center top-24 tracking-[2px] text-gray-400 text-xs lg:text-xl">
				Scroll across and select a preview image to view.
			</h3>
			<div className="relative flex flex-col items-center w-full overflow-hidden xl:pt-10">
				<div className="relative z-30 flex w-screen transition scrollbar-thin overflow-y-hidden snap-x snap-mandatory hover:scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 bottom-20 lg:bottom-44 ">
					{projects?.map((project, index) => (
						<div
							key={project.toString()}
							className="flex flex-col items-center justify-center flex-shrink-0 w-screen h-screen space-y-6 snap-center md:p-44 "
						>
							<Link href={project.linkToBuild}>
								<a target="_blank">
									<motion.img
										initial={{
											y: -300,
											opacity: 0,
										}}
										transition={{ duration: 1.2 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										src={urlFor(project?.image).url()}
										alt=""
										className="flex-shrink-0 object-cover  h-32  md:rounded-lg md:w-64 md:h-56 xl:w-[500px] xl:h-[200px]  xl:mt-32 
                   lg:mt-40 cursor-pointer  rounded-md md:mt-32 sm:w-100 "
									/>
								</a>
							</Link>

							<div className="max-w-6xl space-y-5 md:px-10 ">
								<h4 className="text-xl font-semibold text-center md:text-4xl lg:text-5xl mx-auto w-3/4 md:w-auto  ">
									<span className="underline decoration-[#F7AB0A]/50 text-xs md:text-sm lg:text-lg">
										Case Study {index + 1} of {projects?.length}:{' '}
										{project?.title}
									</span>
								</h4>

								<div className="flex items-center justify-center space-x-2 ">
									{project?.technologies.map((technology) => (
										<img
											className="h-10 rounded-full"
											key={technology._id}
											src={urlFor(technology.image).url()}
											alt=""
										/>
									))}
								</div>
								<p className="text-xs text-center break-words w-3/4 mx-auto md:w-auto md:text-left lg:text-lg xl:text-xl">
									{project?.summary}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="w-full absolute lg:top-[25%] top-[18%] bg-[#F7AB0A]/10 left-0 h-[400px] -skew-y-12 md:top-[25%]"></div>
		</motion.div>
	);
}
