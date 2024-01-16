import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '../../sanity';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { PageInfo, Post, Social } from '../../typings';
import { fetchSocials } from '../../utils/fetchSocials';
import Footer from '../../components/Footer';
// import HandlePageViewCount from '../../components/HandlePageViewCount';
import { useRouter } from 'next/router';
import { fetchPageInfo } from '../../utils/fetchPageInfo';
import { ptComponents } from '../../components/PortableComponents';
import NavBar from '../../components/NavBar';
import { query } from '../api/getPosts';
import SocialShareButtons from '../../components/SocialShareButtons';

interface Props {
	socials: Social[];
	post: Post;
	pageInfo: PageInfo;
}

const Post = ({ socials, post }: Props) => {
	const router = useRouter();
	const { slug } = router.query;
	if (!post) {
		return <div>Loading post data or post not found...</div>;
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

	const baseUrl = 'https://devzidane.vercel.app';
	const fullUrl = slug ? `${baseUrl}/post/${slug}` : baseUrl;

	return (
		<div className="bg-[rgb(35,35,35)] flex-grow text-white h-screen overflow-x-hidden    scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80  flex flex-col min-h-screen ">
			<Head>
				<meta name="description" content={post.title} />
				<title>{post.title}</title>
				<meta property="og:title" content={post.title} key="title" />
				<meta property="og:image" content={post.mainImage} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={title} />
				{post.mainImage && (
					<meta name="twitter:image" content={urlFor(post.mainImage).url()} />
				)}

				{/* Add additional meta tags as needed */}
			</Head>
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
					<div className="text-center text-gray-400 ">
						{publishedAt
							? new Date(publishedAt).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
							  })
							: 'Date not available'}
					</div>
					{/* <HandlePageViewCount post={post} /> */}
					<SocialShareButtons title={title} fullUrl={fullUrl} />
					{mainImage && (
						<div className="flex justify-center mb-6 ">
							<motion.img
								src={urlFor(mainImage).url()}
								alt="Main post image"
								className="rounded-lg shadow-xl "
								width={750} // Adjusting the height of the image
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
