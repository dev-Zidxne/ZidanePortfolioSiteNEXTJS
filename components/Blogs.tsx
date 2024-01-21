import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity';
import { Post } from '../typings';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const ArrowIcon = dynamic(import('./ArrowIcon'));

type Props = {
	posts: Post[];
};

const Blogs = ({ posts }: Props) => {
	return (
		<section className="bg-[rgb(35,35,35)] mt-10 md:mt-16">
			<div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-20 mt-10 ">
				<h2 className="text-3xl md:text-5xl font-semibold text-center mb-8 tracking-[10px] uppercase text-gray-500">
					{posts && posts.length > 0
						? 'The Latest Blogs'
						: 'No latest blogs found.'}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 lg:px-32">
					{posts.map((post) => (
						<Link
							href={`/post/${post.slug.current}`}
							key={post._id}
							className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-[#292929] hover:opacity-80 opacity-100 transition-opacity duration-200 mx-auto max-w-sm"
						>
							<Image
								src={urlFor(post.mainImage).url()}
								alt={post.title}
								priority={true}
								className="h-44 w-full object-cover rounded-lg"
								width={300}
								height={0}
							/>
							<div className="p-4">
								<p className="mb-2 font-bold text-white">{post.title}</p>
								<p className="text-xs text-gray-500">
									{post.publishedAt
										? new Date(post.publishedAt).toLocaleDateString('en-US', {
												month: 'long',
												day: 'numeric',
												year: 'numeric',
										  })
										: 'Date not available'}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className="text-center">
				<Link
					href={`/blog`}
					className="inline-block rounded-md bg-[#F7AB0A] px-6 py-3  font-semibold text-black hover:opacity-80 duration-500 "
				>
					View More
					<div className="inline-block">
						<ArrowIcon />
					</div>
				</Link>
			</div>
		</section>
	);
};

export default Blogs;
