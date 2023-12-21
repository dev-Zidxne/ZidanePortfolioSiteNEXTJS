import React from 'react';
import { sanityClient, urlFor } from '../sanity';
import { Post, Social } from '../typings';
import Link from 'next/link';
import { fetchSocials } from '../utils/fetchSocials';
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import { groq } from 'next-sanity';

type Props = {
	posts: Post[];
	socials: Social[];
};

const Blog = ({ posts, socials }: Props) => {
	return (
		<div className="bg-[rgb(35,35,35)] ">
			<Head>
				<title>Blog | Dev-Z</title>
			</Head>
			<Header socials={socials} />
			<section className="bg-[rgb(35,35,35)] ">
				<div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
					<h2 className="mb-8 text-center tracking-[20px] uppercase text-3xl font-semibold md:text-5xl text-gray-500 ml-6">
						Blogs
					</h2>
					<p className="mb-14 text-center text-sm sm:text-base">
						Take a look at these topics
					</p>

					<div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 ">
						{posts.map((post) => (
							<Link href={`/post/${post.slug.current}`} key={post._id}>
								<a className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-[#292929] hover:opacity-80 opacity-100 transition-opacity duration-200">
									<img
										src={urlFor(post.mainImage).url()}
										alt={post.title}
										className="h-40 w-full object-cover rounded-lg"
									/>
									<div className="p-4">
										<p className="mb-2 font-bold text-white">{post.title}</p>
										<p className="text-xs text-gray-500">
											{new Date(post._createdAt).toLocaleDateString()}
										</p>
									</div>
								</a>
							</Link>
						))}
					</div>
				</div>
			</section>
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
