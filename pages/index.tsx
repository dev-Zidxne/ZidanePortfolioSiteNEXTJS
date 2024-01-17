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
					property="og:description"
					content={`${pageInfo.name} is and expert software engineer proficient in JavaScript, TypeScript, React.js with Next, and Node.js.`}
				/>
				<meta
					property="og:title"
					content={`${pageInfo.name} | Portfolio`}
					key="title"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@dev-Zidxne" />
				<meta name="twitter:creator" content="@zidxne_" />
				<meta
					name="twitter:description"
					content={`${pageInfo.name} is and expert software engineer proficient in JavaScript, TypeScript, React.js with Next, and Node.js.`}
				/>
				<meta name="twitter:title" content="Zidane Innis" />
				<meta name="twitter:image" />
			</Head>
			<NavBar socials={socials} />
			<main className="pb-10g">
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
							<img
								className="w-8 h-8 rounded-full cursor-pointer filter grayscale hover:grayscale-0 "
								src={urlFor(pageInfo?.heroImage).url()}
								alt="Zidane Innis Home Page"
							></img>
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
