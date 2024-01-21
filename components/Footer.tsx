import Link from 'next/link';
import React from 'react';

function Footer() {
	const currentYear = new Date().getFullYear();
	return (
        <div className=" text-white px-10">
			<hr className="border-[#F7AB0A] " />
			<footer className="text-center p-4">
				&copy; {currentYear} Developed by
				<Link href={`/#home`} className="custom-underline cursor-pointer ml-1 ">
					Zidane Innis
				</Link>
			</footer>
		</div>
    );
}

export default Footer;
