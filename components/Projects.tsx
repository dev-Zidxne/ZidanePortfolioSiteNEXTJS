import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../typings';
import Link from 'next/link';
import { urlFor } from '../sanity';
import Image from 'next/image';
import { arrowButton } from './PortableComponents';

type Props = {
	projects: Project[];
};

const Projects = ({ projects }: Props) => {
	return (
		<section>
			<motion.div
				initial={{
					opacity: 0,
				}}
				whileInView={{ opacity: 1 }}
				transition={{
					duration: 1.5,
				}}
				className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-24 lg:py-32 mt-16"
			>
				<h2 className="mb-8 text-center tracking-[20px] uppercase text-3xl font-semibold md:text-5xl text-gray-500 ml-6">
					Projects
				</h2>
				<h3 className="mb-14 text-center text-sm sm:text-base">
					Select a preview image to view.
				</h3>

				<div className="grid gap-x-8 md:grid-cols-2 md:gap-x-4 ">
					{projects?.map((project, index) => (
						<div
							key={project.toString()}
							className="mb-12 inline-block border border-solid border-[#cdcdcd] md:mb-8 lg:mb-10 rounded-xl bg-[#292929] hover:opacity-80 opacity-100 transition-opacity duration-200"
						>
							<Link href={project.linkToBuild}>
								<a
									target="_blank "
									className="hover:opacity-80 transition-all duration-500"
								>
									<motion.div
										initial={{
											y: -300,
											opacity: 0,
										}}
										transition={{ duration: 1.2 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										key={project.toString()}
									>
										<Image
											className="inline-block rounded-xl "
											src={urlFor(project?.image).url()}
											alt="Zidane Innis Project Images Preview"
											width={720}
											height={420}
										/>
									</motion.div>
								</a>
							</Link>

							<div className="px-5 py-8 sm:px-6">
								<h5 className="mb-3 text-xl font-bold">
									{index + 1}. {project.title}
								</h5>
								<p className="flex-col text-[#808080]">{project?.summary}</p>
								<div
									className="mb-5 mt-6 flex flex-wrap gap-2 md:mb-6 lg:mb-8  
                                "
								>
									{/* Map through technologies if available */}
									{project.technologies.map((technology) => (
										<Image
											className="rounded-lg bg-[#d9d9d9]     "
											key={technology._id}
											src={urlFor(technology.image).url()}
											alt="Zidane Innis Technology Skills Stack"
											width={50}
											height={40}
										/>
									))}
								</div>
								<div className="flex flex-wrap items-center justify-between gap-4">
									<Link href={project.linkToBuild}>
										<a className="r flex max-w-full gap-2.5 text-sm font-bold uppercase text-white">
											<p>VISIT WEBSITE</p>
											<Image
												src={arrowButton}
												alt="Arrow Button Icon Link to Project done by Zidane Innis"
												width={20}
												height={20}
												className="inline-block bg-[#F7AB0A] rounded-full hover:opacity-80 duration-500"
											/>
										</a>
									</Link>
									<Link href={project.linkToBuild}>
										<a className="inline-block rounded-md bg-[#F7AB0A] px-6 py-3 text-center font-semibold text-black hover:opacity-80 duration-500 ">
											View Project
										</a>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default Projects;
