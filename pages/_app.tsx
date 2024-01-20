import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Zidane Innis</title>
				<meta
					name="description"
					content="Proficient in JavaScript, TypeScript, React.js, NextJS, and Node.js, Zidane Innis is a collaborative developer focused on enhancing product delivery timelines and optimizing web application performance."
				/>
				<link
					rel="icon"
					href="/favicon.ico"
					type="image/x-icon"
					sizes="16x16"
				></link>
				<meta name="viewport" content="initial-scale=1.0 width=device-width" />
			</Head>
			<Component {...pageProps} />

			<Analytics />
		</>
	);
}
export default MyApp;
