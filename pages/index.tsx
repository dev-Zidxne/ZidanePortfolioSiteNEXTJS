import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import About from '../components/About';
import ContactMe from '../components/ContactMe';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import { urlFor } from '../sanity';
import { Experience, PageInfo, Post, Project, Skill, Social } from '../typings';
import { fetchExperience } from '../utils/fetchExperiences';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import { fetchProjects } from '../utils/fetchProjects';
import { fetchSkills } from '../utils/fetchSkills';
import { fetchSocials } from '../utils/fetchSocials';
import { fetchPosts } from '../utils/fetchPosts';
import Footer from '../components/Footer';
import Blogs from '../components/Blogs';
import NavBar from '../components/NavBar';
import Projects from '../components/Projects';
import Image from 'next/image';

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	skills: Skill[];
	projects: Project[];
	socials: Social[];
	posts: Post[];
};

const Home = ({
	pageInfo,
	experiences,
	skills,
	projects,
	socials,
	posts,
}: Props) => {
	return (
		<div className="bg-[rgb(35,35,35)] flex-grow text-white h-screen overflow-x-hidden    scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80  flex flex-col min-h-screen scroll-smooth">
			<Head>
				<title>Home | {pageInfo.name}</title>
				<meta
					name="description"
					content={` Proficient in JavaScript, TypeScript, React.js with Next, and Node.js. ${pageInfo.name} is a collaborative developer focused on enhancing product delivery timelines and optimizing web application performance."`}
				/>
			</Head>
			<NavBar socials={socials} />
			<main className="pb-10">
				<section id="home" className="snap-start">
					<Hero pageInfo={pageInfo} />
				</section>
				<section id="blog" className="snap-start">
					<Blogs posts={posts} />
				</section>
				<section id="about" className="snap-center">
					<About pageInfo={pageInfo} />
				</section>
				<section id="experience" className="snap-center">
					<WorkExperience experiences={experiences} />
				</section>
				<section id="projects" className="snap-start">
					<Projects projects={projects} />
				</section>
				<section id="skills" className="snap-start">
					<Skills skills={skills} />
				</section>

				<section id="contact" className="snap-start">
					<ContactMe pageInfo={pageInfo} />
				</section>

				<Link href="#home">
					<div className="sticky w-10 h-10 ml-auto mr-2 cursor-pointer bottom-96">
						<div className="">
							<Image
								className="rounded-full cursor-pointer filter grayscale hover:grayscale-0 "
								src={urlFor(pageInfo?.heroImage).url()}
								width={35}
								height={35}
								alt="Zidane Innis Hero Button"
							></Image>
						</div>
					</div>
				</Link>
			</main>
			<Footer />
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
	const posts: Post[] = await fetchPosts();

	return {
		props: {
			pageInfo,
			experiences,
			skills,
			projects,
			socials,
			posts,
		},
	};
};
