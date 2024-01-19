/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				domains: ['cdn.sanity.io', 'assets.website-files.com'],
			},
		],
	},
};

module.exports = nextConfig;
