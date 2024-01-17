// // pages/api/increment-views.js
// import { sanityClient } from '../../sanity';

// export default async function handler(req, res) {
// 	if (req.method === 'POST') {
// 		try {
// 			const postId = req.body.postId;
// 			// Add logic to fetch the current viewsCount and increment it
// 			const currentPost = await sanityClient.fetch(
// 				`*[_id == $postId]{viewsCount}`,
// 				{ postId }
// 			);
// 			const viewsCount = currentPost[0]?.viewsCount
// 				? currentPost[0].viewsCount + 1
// 				: 2;

// 			const mutations = [
// 				{
// 					patch: {
// 						id: postId,
// 						set: { viewsCount: viewsCount },
// 					},
// 				},
// 			];

// 			await sanityClient.mutate(mutations);
// 			res.status(200).json({ message: 'View count incremented' });
// 		} catch (error) {
// 			res.status(500).json({ message: 'Error incrementing view count', error });
// 		}
// 	} else {
// 		res.setHeader('Allow', ['POST']);
// 		res.status(405).end(`Method ${req.method} Not Allowed`);
// 	}
// }
