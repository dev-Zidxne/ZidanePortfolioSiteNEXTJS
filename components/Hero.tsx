import Link from 'next/link';
import React from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { urlFor } from '../sanity';
import { PageInfo } from '../typings';
import BackgroundCircles from './BackgroundCircles';

type Props = {
	pageInfo: PageInfo;
};

const links = [
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
		name: 'Blog (W.I.P)',
		url: '/#blog',
	},
	{
		name: 'contact',
		url: '#contact',
	},
];

function Hero({ pageInfo }: Props) {
	const [text, count] = useTypewriter({
		words: [`Hi, my name is ${pageInfo?.name}.`, `${pageInfo?.role}`],
		loop: true,
		delaySpeed: 2000,
	});
	return (
		<div className="flex flex-col items-center justify-center h-screen space-y-8 overflow-hidden text-center ">
			<BackgroundCircles />
			<img
				className="object-cover w-32 h-32 mx-auto rounded-full"
				src={urlFor(pageInfo?.heroImage).url()}
				alt=""
			/>
			<div className="z-0">
				<h2 className="pb-2 text-sm uppercase tracking-[15px] text-gray-500 ">
					Software Engineer
				</h2>
				<h1 className="text-5xl font-semibold lg:text-6xl scroll-px10">
					<span className="mr-3">{text}</span>
					<Cursor cursorColor="#F7AB0A" />
				</h1>
			</div>
			<div className="z-10 pt-1 space-x-4">
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
