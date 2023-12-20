// [slug].tsx

import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../../sanity';
import { motion } from 'framer-motion';
import { Post, Social } from '../../typings';
import { fetchSocials } from '../../utils/fetchSocials';
import Header from '../../components/Header';
import Head from 'next/head';

function urlFor(source) {
	return imageUrlBuilder(sanityClient).image(source);
}

const ptComponents = {
	types: {
		image: ({ value }) => {
			if (!value?.asset?._ref) {
				return null;
			}
			return (
				<img
					alt={value.alt || ' '}
					loading="lazy"
					src={urlFor(value).width(320).height(240).fit('max').auto('format')}
				/>
			);
		},
	},
};

type Props = {
	socials: Social[];
};

// Assume the necessary imports are already there

const Post = ({ socials, post }: Post) => {
	const {
		title = 'Missing title',
		name = 'Missing name',
		categories,
		authorImage,
		_createdAt,
		mainImage,
		body,
	} = post;

	return (
		<div className="bg-[rgb(35,35,35)] min-h-screen">
			<Head>
				<title>{title} | Dev-Z</title>
			</Head>
			<Header socials={socials} />
			<article className="max-w-4xl mx-auto p-5 text-white">
				<h1 className="text-3xl md:text-5xl font-semibold text-center mb-8 tracking-[10px] uppercase text-gray-500">
					{title}
				</h1>
				<div className="text-center mb-4">
					<span className="text-lg font-medium text-gray-400">By {name}</span>
				</div>

				{authorImage && (
					<div className="flex justify-center mb-4">
						<img
							src={urlFor(authorImage).width(50).url()}
							alt={`${name}'s picture`}
							className="rounded-full" // Tailwind styling for author image
						/>
					</div>
				)}
				{categories && (
					<ul className="flex justify-center mb-4 space-x-2">
						<span className="font-medium text-gray-400">Posted in:</span>
						{categories.map((category) => (
							<li key={category} className="text-blue-500 font-medium">
								{category}
							</li>
						))}
					</ul>
				)}
				<div className="text-center text-gray-400 mb-6">
					{_createdAt
						? new Date(_createdAt).toLocaleDateString()
						: 'Date not available'}
				</div>

				{mainImage && (
					<div className="flex justify-center mb-6 ">
						<motion.img
							src={urlFor(mainImage).url()}
							alt="Main post image"
							className="max-w-full md:max-w-2xl mx-auto h-auto max-h-96 rounded-lg shadow-xl" // Adjusting the height of the image
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 20,
							}}
						/>
					</div>
				)}

				<PortableText value={body} components={ptComponents} />
			</article>
		</div>
	);
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  body
}`;
export async function getStaticPaths() {
	const paths = await sanityClient.fetch(
		groq`*[_type == "post" && defined(slug.current)][].slug.current`
	);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export async function getStaticProps(context) {
	const { slug = '' } = context.params;
	const post = await sanityClient.fetch(query, { slug });
	console.log('Fetched post:', post); // Add this line to debug

	const socials: Social[] = await fetchSocials();
	return {
		props: {
			post,
			socials,
		},
	};
}
export default Post;
