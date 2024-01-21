import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity';
import { Post } from '../typings';
import Image from 'next/image';
import ArrowIcon from './ArrowIcon';

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
				<div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-1 md:grid-cols-3">
					{posts.map((post) => (
						<Link href={`/post/${post.slug.current}`} key={post._id}>
							<a className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-[#292929] hover:opacity-80 opacity-100 transition-opacity duration-200 mx-auto max-w-sm">
								<Image
									src={urlFor(post.mainImage).url()}
									alt={post.title}
									priority={true}
									className="h-40 w-full object-cover rounded-lg"
									width={360}
									height={220}
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
							</a>
						</Link>
					))}
				</div>
			</div>
			<div className="text-center">
				<Link href={`/blog`}>
					<a className="inline-block rounded-md bg-[#F7AB0A] px-6 py-3  font-semibold text-black hover:opacity-80 duration-500 ">
						View More
						<div className="inline-block">
							<ArrowIcon />
						</div>
					</a>
				</Link>
			</div>
		</section>
	);
};

export default Blogs;
