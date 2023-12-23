'use client';

import { useCallback, useEffect } from 'react';
import { Post } from '../typings';

type Props = {
	post: Post;
};

function HandlePageViewCount({ post }: Props) {
	// Inside your HandlePageViewCount component
	useEffect(() => {
		const incrementPostViews = async () => {
			try {
				const response = await fetch('/api/increment-views', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ postId: post?._id }),
				});
				if (!response.ok) {
					throw new Error('Failed to increment views');
				}

				// Handle response if needed
			} catch (error) {
				console.error('Error incrementing post views:', error);
			}
		};

		if (post?._id) {
			incrementPostViews();
		}
	}, [post?._id]);

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
		<div className="text-sm text-gray-400 lg:text-base text-center">
			{formatViewsCount} {formatViewsCount > '1' ? 'views' : 'view'}
		</div>
	);
}

export default HandlePageViewCount;
