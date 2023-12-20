export const fetchPosts = async () => {
	try {
		const res = await fetch(`http://localhost:3000/api/getPosts`);
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}
		const data = await res.json();
		return data.posts;
	} catch (error) {
		console.error('Error fetching posts:', error);
		return [];
	}
};
