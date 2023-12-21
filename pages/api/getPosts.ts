// pages/api/getPosts.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity';
import { Post } from '../../typings';

const query = groq`*[_type == "post"] | order(publishedAt desc)`;

type Data = {
	posts: Post[];
	message?: string; // Optional message property
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		const posts: Post[] = await sanityClient.fetch(query);
		res.status(200).json({ posts });
	} catch (error) {
		console.error('Error fetching posts:', error);
		res.status(500).json({ message: 'Error fetching posts', posts: [] });
	}
}