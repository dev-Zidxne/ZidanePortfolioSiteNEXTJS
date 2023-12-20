import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { sanityClient, urlFor } from '../../sanity';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import { Post, Social } from '../../typings';
import { fetchSocials } from '../../utils/fetchSocials';
import Image from 'next/image';

interface PortableTextComponentsExtended extends PortableTextComponents {
	types: {
		image: (props: any) => JSX.Element | null;
	};
}

interface ImageType {
	asset: {
		_ref: string;
	};
	alt?: string;
}

const ptComponents = {
	types: {
		image: ({ value }: { value: ImageType }) => {
			if (!value?.asset?._ref) {
				return null;
			}

			const imageUrl = urlFor(value)
				.width(320)
				.height(240)
				.fit('max')
				.auto('format')
				.url();

			if (!imageUrl) return null;

			return (
				<Image
					alt={value.alt || ' '}
					loading="lazy"
					src={imageUrl}
					width={320}
					height={240}
				/>
			);
		},
	},
};
interface Props {
	socials: Social[];
	post: Post;
}

const Post: NextPage<Props> = ({ socials, post }) => {
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
			<article key={title} className="max-w-4xl mx-auto p-5 text-white">
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
						{categories.map((category: string) => (
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
  body,
  _createdAt
}`;

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await sanityClient.fetch(
		groq`*[_type == "post" && defined(slug.current)][].slug.current`
	);

	return {
		paths: paths.map((slug: string) => ({ params: { slug } })),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
	const { slug = '' } = context.params as { slug: string };
	const post = await sanityClient.fetch(query, { slug });
	const socials: Social[] = await fetchSocials();

	return {
		props: {
			post,
			socials,
		},
	};
};

export default Post;

// [slug].tsx
