import React, { useCallback, useEffect } from 'react';
import { Post } from '../typings';

type Props = {
	post: Post;
};
const HandlePageViewCount = ({ post }: Props) => {
	const incrementPostViews = useCallback(
		(postId: string) => {
			// Code for updating the viewsCount field will go here
			const mutations = [
				{
					patch: {
						_id: postId,
						set: {
							viewsCount: post.viewsCount ? post.viewsCount + 1 : 2, // Ensure post is defined
						},
					},
				},
			];
			fetch(
				`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
				{
					method: 'post',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
					},
					body: JSON.stringify({ mutations }),
				}
			)
				.then((response) => response.json())
				.then((result) => console.log(result))
				.catch((error) => console.error(error));
		},
		[post]
	);
	useEffect(() => {
		incrementPostViews(post?._id);
	}, [incrementPostViews, post?._id]);

	const formatViewsCountFunc = () => {
		const viewsCount = post?.viewsCount || 1;
		if (viewsCount < 1000) {
			return viewsCount.toString();
		} else if (viewsCount < 1000000) {
			return (viewsCount / 1000).toFixed(2) + 'K';
		} else {
			return (viewsCount / 1000000).toFixed(2) + 'M';
		}
	};

	let formatViewsCount = formatViewsCountFunc();
	return (
		<div className="text-sm text-gray-400 lg:text-base">
			{formatViewsCount} {formatViewsCount > '1' ? 'views' : 'view'}
		</div>
	);
};

export default HandlePageViewCount;
