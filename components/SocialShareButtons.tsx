import React from 'react';
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	XIcon,
} from 'react-share';

interface SocialShareButtonsProps {
	title: string;
	fullUrl: string;
}

function SocialShareButtons({ title, fullUrl }: SocialShareButtonsProps) {
	return (
		<div className="text-center p-3">
			<div className="sticky top-20 lg:right-10 md:right-5 right-0 bg-[rgb(45,45,45)] p-2 rounded-lg shadow-lg inline-flex flex-row items-center gap-2 z-50">
				{/* Social Share Buttons */}
				<p>Share to:</p>
				<FacebookShareButton url={fullUrl} title={title}>
					<FacebookIcon size={32} round />
				</FacebookShareButton>
				<TwitterShareButton url={fullUrl} title={title}>
					<XIcon size={32} round />
				</TwitterShareButton>
				<LinkedinShareButton url={fullUrl} title={title}>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton>
				<RedditShareButton url={fullUrl} title={title}>
					<RedditIcon size={32} round />
				</RedditShareButton>
				<WhatsappShareButton url={fullUrl} title={title}>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
			</div>
		</div>
	);
}

export default SocialShareButtons;
