import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Social } from '../typings';

type Props = {
	socials: Social[];
};

export default function Header({ socials }: Props) {
	return (
		<header className="sticky top-0 z-50 flex items-start justify-between pl-5 pr-5 mx-auto max-w-7xl xl:items-center backdrop-blur-md back lg:max-w-full lg:justify-around md:max-w-full md:justify-around sm:max-w-full sm:justify-around xs:max-w-full xs:justify-around xl:max-w-full xl:justify-around 2xl:max-w-full 2xl:justify-around">
			<motion.div
				initial={{ x: -500, opacity: 0, scale: 0.5 }}
				animate={{
					x: 0,
					opacity: 1,
					scale: 1,
				}}
				transition={{
					duration: 1.5,
				}}
				className="flex flex-row items-center"
			>
				{socials.map((social) => (
					<div className="social-icon-wrapper" key={social._id}>
						<SocialIcon
							key={social._id}
							url={social.url}
							bgColor="transparent"
							fgColor="currentColor"
							className="text-[#808080ff] transition cursor-pointer hover:text-white"
							target="_blank"
						/>
						<span className="tooltip-text">{social.title}</span>
					</div>
				))}
			</motion.div>
			<Link href="#contact">
				<motion.div
					initial={{ x: 500, opacity: 0, scale: 0.5 }}
					animate={{
						x: 0,
						opacity: 1,
						scale: 1,
					}}
					transition={{
						duration: 1.5,
					}}
					className="flex flex-row items-center text-gray-300 cursor-pointer "
				>
					<div className="tippy-tooltip">
						<SocialIcon
							className="text-[#808080ff] transition cursor-pointer hover:text-white "
							network="email"
							fgColor="currentColor"
							bgColor="transparent"
						/>
					</div>
					<p className="hidden text-sm text-gray-400 uppercase md:inline-flex">
						Get In Touch
					</p>
				</motion.div>
			</Link>
		</header>
	);
}
