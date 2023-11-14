import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import About from '../components/About';
import ContactMe from '../components/ContactMe';
import ExperienceCard from '../components/ExperienceCard';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import { urlFor } from '../sanity';
import styles from '../styles/Home.module.css';
import { Experience, PageInfo, Project, Skill, Social } from '../typings';
import { fetchExperience } from '../utils/fetchExperiences';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import { fetchProjects } from '../utils/fetchProjects';
import { fetchSkills } from '../utils/fetchSkills';
import { fetchSocials } from '../utils/fetchSocials';
import Projects2 from '../components/Projects2';

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	skills: Skill[];
	projects: Project[];
	socials: Social[];
};

const Home = ({ pageInfo, experiences, skills, projects, socials }: Props) => {
	return (
		<div className="bg-[rgb(35,35,35)] text-white h-screen  overflow-x-hidden   scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 container-snap">
			<Head>
				<title>{pageInfo?.name}</title>
			</Head>
			<Header socials={socials} />

			<section id="hero" className="snap-start">
				<Hero pageInfo={pageInfo} />
			</section>
			<section id="about" className="snap-center">
				<About pageInfo={pageInfo} />
			</section>
			<section id="experience" className="snap-center">
				<WorkExperience experiences={experiences} />
			</section>
			<section id="skills" className="snap-start">
				<Skills skills={skills} />
			</section>
			{/* <section id="projects" className="snap-start">
				<Projects projects={projects} />
			</section> */}
			<section id="projects" className="snap-start">
				<Projects2 projects={projects} />
			</section>
			<section id="contact" className="snap-start">
				<ContactMe pageInfo={pageInfo} />
			</section>
			<Link href="#hero">
				<footer className="sticky w-10 h-10 ml-auto mr-2 cursor-pointer bottom-96">
					<div className="">
						<img
							className="w-8 h-8 rounded-full cursor-pointer filter grayscale hover:grayscale-0 "
							src={urlFor(pageInfo?.heroImage).url()}
							alt=""
						></img>
					</div>
				</footer>
			</Link>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const pageInfo: PageInfo = await fetchPageInfo();
	const experiences: Experience[] = await fetchExperience();
	const skills: Skill[] = await fetchSkills();
	const projects: Project[] = await fetchProjects();
	const socials: Social[] = await fetchSocials();

	return {
		props: {
			pageInfo,
			experiences,
			skills,
			projects,
			socials,
		},
	};
};
