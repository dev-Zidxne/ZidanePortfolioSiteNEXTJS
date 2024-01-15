import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Social } from '../typings';
import Image from 'next/image';

type Props = {
	socials: Social[];
};

export default function NavBar({ socials }: Props) {
	return (
		<header className="sticky top-0 z-50 w-full backdrop-blur-md backdrop-brightness-125">
			<div className="flex items-center justify-between px-5 mx-auto max-w-7xl ">
				<motion.div
					initial={{ x: -500, opacity: 0, scale: 0.5 }}
					animate={{ x: 0, opacity: 1, scale: 1 }}
					transition={{ duration: 1.5 }}
					className="flex items-center"
				>
					{/* Logo Image */}
					<Link href={`/#home`}>
						<Image
							src="/favicon.ico"
							className="cursor-pointer"
							alt="Logo"
							width={40}
							height={40}
						/>
					</Link>

					{/* Social Icons */}
					{socials.map((social) => (
						<SocialIcon
							key={social._id}
							url={social.url}
							about={social.url}
							bgColor="transparent"
							fgColor="currentColor"
							className="ml-3 text-[#808080ff] transition cursor-pointer hover:text-[#F7AB0A]"
							rel="noreferrer"
							target="_blank"
						/>
					))}
				</motion.div>

				{/* Right Side Content */}
				<Link href="/#contact">
					<motion.div
						initial={{ x: 500, opacity: 0, scale: 0.5 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						transition={{ duration: 1.5 }}
						className="flex items-center cursor-pointer text-gray-300"
					>
						<SocialIcon
							className="text-[#808080ff] transition cursor-pointer hover:text-[#F7AB0A]"
							network="email"
							fgColor="currentColor"
							bgColor="transparent"
						/>
						<p className="hidden ml-2 text-sm text-gray-400 uppercase md:inline-flex">
							Get In Touch
						</p>
					</motion.div>
				</Link>
			</div>
		</header>
	);
}
