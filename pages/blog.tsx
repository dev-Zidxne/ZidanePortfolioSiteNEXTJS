import React, { useState } from 'react';
import { sanityClient, urlFor } from '../sanity';
import { Post, Social } from '../typings';
import Link from 'next/link';
import { fetchSocials } from '../utils/fetchSocials';
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import { groq } from 'next-sanity';
import { Pagination } from '../components/Pagination';

type Props = {
	posts: Post[];
	socials: Social[];
};

const Blog = ({ posts, socials }: Props) => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="bg-[rgb(35,35,35)] flex-grow text-white h-screen overflow-x-hidden scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 flex flex-col min-h-screen">
			<Head>
				<title>Blog | Dev-Zidane</title>
				<meta property="og:title" content="Zidane Innis Blog" key="title" />
				<meta
					property="og:description"
					content="Explore topics on web development and general topics on Zidane Innis' Blog. Discover latest trends, tech insights, and tutorials. Ideal for anyone and developers at all levels."
				/>
				<meta name="twitter:title" content="Dev-Zidane | Blog" />
				<meta property="og:type" content="article" />

				{/* Add additional meta tags as needed */}
			</Head>
			<Header socials={socials} />
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
								<Link href={`/post/${post.slug.current}`} key={post._id}>
									<a className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-[#292929] hover:opacity-80 opacity-100 transition-opacity duration-200 mx-auto max-w-sm">
										<img
											src={urlFor(post.mainImage).url()}
											alt={post.title}
											className="h-40 w-full object-cover rounded-lg"
										/>
										<div className="p-4">
											<p className="mb-2 font-bold">{post.title}</p>
											<p className="text-xs text-gray-500">
												{new Date(post.publishedAt).toLocaleDateString()}
											</p>
										</div>
									</a>
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
	return {
		props: {
			posts,
			socials,
		},
		revalidate: 60, // revalidate at most once per minute
	};
};

export default Blog;
