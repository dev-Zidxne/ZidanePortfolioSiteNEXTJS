import Link from 'next/link';
import React from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { urlFor } from '../sanity';
import { PageInfo } from '../typings';
import BackgroundCircles from './BackgroundCircles';
import Image from 'next/image';

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
			<div className="mt-4">
				{' '}
				{/* Adjust the margin top to move the picture down */}
				<Image
					className="object-cover mx-auto rounded-full"
					src={urlFor(pageInfo?.heroImage).url()}
					alt="Zidane Innis Main Profile Picture"
					width={130}
					height={130}
				/>
			</div>
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
					<Link key={link.name} href={link.url} legacyBehavior>
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
