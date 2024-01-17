import Link from 'next/link';
import React from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { urlFor } from '../sanity';
import { PageInfo } from '../typings';
import BackgroundCircles from './BackgroundCircles';
import Head from 'next/head';

type Props = {
	pageInfo: PageInfo;
};

const links = [
	{
		name: 'Blog (NEW!)',
		url: `/blog`,
	},
	{
		name: 'About',
		url: '#about',
	},
	{
		name: 'Experience',
		url: '#experience',
	},
	{
		name: 'Projects',
		url: '#projects',
	},
	{
		name: 'Skills',
		url: '#skills',
	},

	{
		name: 'contact',
		url: '#contact',
	},
];

function Hero({ pageInfo }: Props) {
	const [text, count] = useTypewriter({
		words: [` Hi, I'm ${pageInfo?.name}.`, `${pageInfo?.role}`],
		loop: true,
		delaySpeed: 2000,
	});
	return (
		<div className="flex flex-col items-center justify-center  space-y-10 overflow-hidden text-center">
			<BackgroundCircles />
			<Head>
				<meta property="og:title" content={pageInfo.name} />
				<meta
					property="og:description"
					content={pageInfo.backgroundInformation}
				/>
				<meta property="og:type" content="article" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={pageInfo.name} />
				<meta
					name="twitter:description"
					content={pageInfo.backgroundInformation}
				/>
			</Head>
			<img
				className="object-cover w-32 h-32 mx-auto rounded-full"
				src={urlFor(pageInfo?.heroImage).url()}
				alt=""
			/>
			<div className="z-10 h-20 ">
				<h2 className="pb-2 text-sm uppercase tracking-[15px] text-gray-500 ">
					Web Developer
				</h2>
				<h1 className="text-5xl font-semibold lg:text-6xl scroll-px-10 ">
					<span className="mr-3 ">{text}</span>
					<Cursor cursorColor="#F7AB0A" />
				</h1>
			</div>
			<div className="z-10 pt-1 space-x-1">
				{links.map((link) => (
					<Link key={link.name} href={link.url}>
						<button type="button" className="heroButton custom-underline  ">
							{link.name}
						</button>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Hero;
