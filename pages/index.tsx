import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import ExperienceCard from "../components/ExperienceCard";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import styles from "../styles/Home.module.css";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import { fetchExperience } from "../utils/fetchExperiences";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, skills, projects, socials }: Props) => {
  return (
    <h2>Hello</h2>
    // <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden  z-0  scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
    //   <Head>
    //     <title>{pageInfo?.name}</title>
    //   </Head>
    //   <Header socials={socials} />

    //   <section id="hero" className="snap-start">
    //     <Hero pageInfo={pageInfo} />
    //   </section>
    //   <section id="about" className="snap-center">
    //     <About pageInfo={pageInfo} />
    //   </section>
    //   <section id="experience" className="snap-center">
    //     <WorkExperience experiences={experiences} />
    //   </section>
    //   <section id="skills" className="snap-start">
    //     <Skills skills={skills} />
    //   </section>
    //   <section id="projects" className="snap-start">
    //     <Projects projects={projects} />
    //   </section>
    //   <section id="contact" className="snap-start">
    //     <ContactMe pageInfo={pageInfo} />
    //   </section>
    //   <Link href="#hero">
    //     <footer className="sticky w-full cursor-pointer bottom-5">
    //       <div className="flex items-center justify-center">
    //         <img
    //           className="w-10 h-10 rounded-full cursor-pointer filter grayscale hover:grayscale-0 "
    //           src="https://media-exp1.licdn.com/dms/image/D4E03AQHdJZFLTFQDHQ/profile-displayphoto-shrink_800_800/0/1665970228383?e=1671667200&v=beta&t=wKKVw1mofVg899wMOc5pVB5suTg4nD0Vz8PWKdjtz6w"
    //           alt=""
    //         ></img>
    //       </div>
    //     </footer>
    //   </Link>
    // </div>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const pageInfo: PageInfo = await fetchPageInfo();
//   const experiences: Experience[] = await fetchExperience();
//   const skills: Skill[] = await fetchSkills();
//   const projects: Project[] = await fetchProjects();
//   const socials: Social[] = await fetchSocials();

//   return {
//     props: {
//       pageInfo,
//       experiences,
//       skills,
//       projects,
//       socials,
//     },
//   };
// };
