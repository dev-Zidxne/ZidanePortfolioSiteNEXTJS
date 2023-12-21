import { Post } from '../typings';

export const fetchPosts = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPosts`);

		if (!res.ok) {
			throw new Error(`Failed to fetch posts, status: ${res.status}`);
		}

		const data = await res.json();
		const posts: Post[] = data.posts;

		console.log('fetching', posts);
		return posts;
	} catch (error) {
		console.error('Error fetching posts:', error);
		return [];
	}
};
