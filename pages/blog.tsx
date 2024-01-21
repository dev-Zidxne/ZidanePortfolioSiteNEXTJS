import React, { useState } from 'react';
import { sanityClient, urlFor } from '../sanity';
import { PageInfo, Post, Social } from '../typings';
import Link from 'next/link';
import { fetchSocials } from '../utils/fetchSocials';
import Head from 'next/head';
import Footer from '../components/Footer';
import { groq } from 'next-sanity';
import { Pagination } from '../components/Pagination';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import NavBar from '../components/NavBar';
import Image from 'next/image';

type Props = {
	posts: Post[];
	socials: Social[];
	pageInfo: PageInfo;
};

const Blog = ({ posts, socials, pageInfo }: Props) => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="bg-[rgb(35,35,35)] flex-grow text-white h-screen overflow-x-hidden scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 flex flex-col min-h-screen">
			<Head>
				<title>Blog | {pageInfo.name}</title>

				<meta
					name="description"
					content="Explore topics on web development and general topics on Zidane Innis' Blog. Discover latest trends, tech insights, and tutorials. Ideal for anyone and developers at all levels."
				/>
				<meta name="twitter:title" content="Zidane Innis | Blog" />
			</Head>
			<NavBar socials={socials} />
			<main className="flex-grow">
				<section>
					<div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-14">
						<h2 className="mb-8 text-center tracking-[20px] uppercase text-3xl font-semibold md:text-5xl text-gray-500 ml-6">
							Blogs
						</h2>
						<p className="mb-14 text-center text-sm sm:text-base">
							Choose A Topic that Interests You
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 lg:px-32">
							{currentPosts.map((post) => (
								<Link
									href={`/post/${post.slug.current}`}
									key={post._id}
									className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-[#292929] hover:opacity-80 opacity-100 transition-opacity duration-200 mx-auto max-w-sm"
								>
									<Image
										src={urlFor(post.mainImage).url()}
										alt={post.title}
										className="h-44 w-full object-cover rounded-lg"
										width={360}
										height={220}
									/>
									<div className="p-4">
										<p className="mb-2 font-bold">{post.title}</p>
										<p className="text-xs text-gray-500">
											{new Date(post.publishedAt).toLocaleDateString()}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={posts.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</main>
			<Footer />
		</div>
	);
};

export const getStaticProps = async () => {
	const query = groq`*[_type == "post"] | order(publishedAt desc)`;
	const posts = await sanityClient.fetch(query);
	const socials: Social[] = await fetchSocials();
	const pageInfo: PageInfo = await fetchPageInfo();
	return {
		props: {
			posts,
			socials,
			pageInfo,
		},
	};
};

export default Blog;
