import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />

			<Analytics />
		</>
	);
}
export default MyApp;
