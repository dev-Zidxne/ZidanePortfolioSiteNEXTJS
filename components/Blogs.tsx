// Blogs component
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity';
import { Post } from '../typings';

type Props = {
	posts: Post[];
};

const Blogs = ({ posts }: Props) => {
	console.log('Received posts in Blogs: ', posts);

	if (!posts || posts.length === 0) {
		return <div>No latest blogs found.</div>;
	}

	return (
		<section className="bg-[rgb(35,35,35)] ">
			<div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
				<h2 className="text-3xl md:text-5xl font-semibold text-center mb-8 tracking-[10px] uppercase text-gray-500">
					The Latest Blogs
				</h2>
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
			<div className="text-center">
				<Link href={`/blog`}>
					<a className="inline-block rounded-md bg-[#F7AB0A] px-6 py-3  font-semibold text-black hover:opacity-80 duration-500 ">
						View More{' '}
						<img
							src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b636d7c440a74b4076b278_button-link.svg"
							alt=""
							className="inline-block bg-[#F7AB0A] rounded-full hover:opacity-80 duration-500"
						/>
					</a>
				</Link>
			</div>
		</section>
	);
};

export default Blogs;
