import Link from 'next/link';
import React from 'react';
import { PageInfo } from '../typings';

function Footer() {
	return (
		<div className=" text-white px-10">
			<hr className="border-[#F7AB0A] " />
			<footer className="text-center p-4">
				&copy; 2023 Developed by
				<Link href={`/#home`}>
					<a className="custom-underline cursor-pointer ml-1 ">Zidane Innis</a>
				</Link>
			</footer>
		</div>
	);
}

export default Footer;
