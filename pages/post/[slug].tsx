import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '../../sanity';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { PageInfo, Post, Social } from '../../typings';
import { fetchSocials } from '../../utils/fetchSocials';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { fetchPageInfo } from '../../utils/fetchPageInfo';
import SocialShareButtons from '../../components/SocialShareButtons';
import NavBar from '../../components/NavBar';
import { queryPosts } from '../api/getPosts';
import { ptComponents } from '../../components/PortableComponents';
import Image from 'next/image';
interface Props {
	socials: Social[];
	post: Post;
	pageInfo: PageInfo;
}

const Post = ({ socials, post, pageInfo }: Props) => {
	const router = useRouter();
	const { slug } = router.query;
	const baseUrl = 'https://devzidane.vercel.app';
	const fullUrl = slug ? `${baseUrl}/post/${slug}` : baseUrl;
	if (!post || !post.title) {
		return (
			<>
				{/* Add any necessary head data here */}
				<p>Loading post data or post not found...</p>
			</>
		);
	}
	const {
		title = 'Missing title',
		name = 'Missing name',
		categories,
		authorImage,
		mainImage,
		publishedAt,
		body,
	} = post;
	const pageHeadData = (
		<Head>
			<meta name="description" />
			<title>
				{title} | {pageInfo.name}
			</title>
			<meta property="title" content={title} />
			<meta property="description" content={title} />
			<meta property="url" content={`${baseUrl}/post/${slug}`} />
			{post.mainImage && (
				<meta property="image" content={urlFor(post.mainImage).url()} />
			)}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={title} />
			<meta name="robots" content="all" />
			{post.mainImage && (
				<meta name="twitter:image" content={urlFor(post.mainImage).url()} />
			)}
		</Head>
	);

	return (
		<div className="bg-[rgb(35,35,35)] flex-grow text-white h-screen overflow-x-hidden    scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80  flex flex-col min-h-screen ">
			{pageHeadData}
			<NavBar socials={socials} />
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
							<Image
								src={urlFor(authorImage).url()}
								alt={`${name}'s picture`}
								className="rounded-full"
								width={50}
								height={50}
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
					<div className="text-center text-gray-400 ">
						{publishedAt
							? new Date(publishedAt).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
							  })
							: 'Date not available'}
					</div>
					<SocialShareButtons fullUrl={fullUrl} title={title} />
					{mainImage && (
						<div className="flex justify-center mb-6 ">
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20,
								}}
							>
								<Image
									className="rounded-lg shadow-xl "
									src={urlFor(mainImage).url()}
									width={750}
									height={429}
									alt="Main Post Image Zidane Innis Blog"
								/>
							</motion.div>
						</div>
					)}
					<PortableText value={body} components={ptComponents} />
				</article>
			</main>
			<Footer />
		</div>
	);
};

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
	const post = await sanityClient.fetch(queryPosts, { slug });
	const socials: Social[] = await fetchSocials();
	const pageInfo: PageInfo = await fetchPageInfo();

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			pageInfo,
			post,
			socials,
		},
		revalidate: 60,
	};
};

export default Post;
