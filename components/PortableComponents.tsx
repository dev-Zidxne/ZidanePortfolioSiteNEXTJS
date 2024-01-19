import Image from 'next/image';
import { urlFor } from '../sanity';

interface ImageType {
	asset: {
		_ref: string;
	};
	alt?: string;
}

export const arrowButton =
	'https://assets.website-files.com/6458c625291a94a195e6cf3a/64b636d7c440a74b4076b278_button-link.svg';

export const ptComponents = {
	types: {
		image: ({ value }: { value: ImageType }) => {
			if (!value?.asset?._ref) {
				return null;
			}

			const imageUrl = urlFor(value).fit('max').auto('format').url();

			if (!imageUrl) return null;

			return (
				<div className="flex justify-center my-5">
					<Image
						alt={value.alt || ' '}
						loading="lazy"
						width={600}
						height={350}
						src={imageUrl}
						className="rounded-lg"
					/>
				</div>
			);
		},
	},
	block: ({ node, children }: any) => {
		switch (node.style) {
			case 'normal':
				return <h3 className=" my-8">{children}</h3>;
			case 'h1':
				return <h1 className="text-4xl font-bold my-4">{children}</h1>;
			case 'h2':
				return <h2 className="text-3xl font-semibold my-3">{children}</h2>;
			case 'h3':
				return <h3 className="text-2xl font-medium my-2">{children}</h3>;
			case 'h4':
				return <h4 className="text-xl font-medium my-2">{children}</h4>;
			case 'blockquote':
				return (
					<blockquote className="italic border-l-4 pl-4">{children}</blockquote>
				);

			default:
				return <p>{children}</p>;
		}
	},
	list: ({ type, children }: any) => {
		if (type === 'bullet') {
			return <ul className="list-disc list-inside space-y-2">{children}</ul>;
		}
		return <ol className="list-decimal list-inside space-y-2">{children}</ol>;
	},
	listItem: ({ children }: any) => <li>{children}</li>,
};
