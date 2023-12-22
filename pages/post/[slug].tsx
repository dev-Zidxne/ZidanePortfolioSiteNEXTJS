import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '../../sanity';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import { Post, Social } from '../../typings';
import { fetchSocials } from '../../utils/fetchSocials';
import Footer from '../../components/Footer';
import HandlePageViewCount from '../../components/HandlePageViewCount';

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
				<div className="flex justify-center my-5">
					<img
						alt={value.alt || ' '}
						loading="lazy"
						src={imageUrl}
						width={320}
						height={240}
						className="rounded-lg"
					/>
				</div>
			);
		},
	},
	block: ({ node, children }: any) => {
		switch (node.style) {
			case 'normal':
				return <h3 className=" my-8">{children}</h3>;
			case 'h1':
				return <h1 className="text-4xl font-bold my-4">{children}</h1>;
			case 'h2':
				return <h2 className="text-3xl font-semibold my-3">{children}</h2>;
			case 'h3':
				return <h3 className="text-2xl font-medium my-2">{children}</h3>;
			case 'h4':
				return <h4 className="text-xl font-medium my-2">{children}</h4>;
			case 'blockquote':
				return (
					<blockquote className="italic border-l-4 pl-4">{children}</blockquote>
				);

			default:
				return <p>{children}</p>;
		}
	},
	list: ({ type, children }: any) => {
		if (type === 'bullet') {
			return <ul className="list-disc list-inside space-y-2">{children}</ul>;
		}
		return <ol className="list-decimal list-inside space-y-2">{children}</ol>;
	},
	listItem: ({ children }: any) => <li>{children}</li>,
};
interface Props {
	socials: Social[];
	post: Post;
}

const Post: NextPage<Props> = ({ socials, post }) => {
	if (!post) {
		return <div>Loading post data or post not found...</div>;
	}
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
		<div className="bg-[rgb(35,35,35)] flex-grow text-white h-screen overflow-x-hidden    scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80  flex flex-col min-h-screen ">
			<Head>
				<title>{title} | Dev-Z</title>
			</Head>
			<Header socials={socials} />
			<main className="flex-grow pb-20">
				<article key={title} className="max-w-4xl mx-auto p-5 text-white">
					<h1 className="text-3xl md:text-5xl font-semibold text-center mb-8 tracking-[10px] uppercase text-gray-500">
						{title}
					</h1>
					<div className="text-center mb-4">
						<span className="text-lg font-medium text-gray-400">By </span>
						<a className="text-white  text-lg font-medium">{name}</a>
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
									| {category}
								</li>
							))}
						</ul>
					)}
					<div className="text-center text-gray-400 mb-6">
						{_createdAt
							? new Date(_createdAt).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
							  })
							: 'Date not available'}
						<HandlePageViewCount post={post} />
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
			</main>
			<Footer />
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
	const slug = context.params?.slug as string;
	const post = await sanityClient.fetch(query, { slug });
	const socials: Social[] = await fetchSocials();

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
			socials,
		},
		revalidate: 60,
	};
};

export default Post;

// [slug].tsx
