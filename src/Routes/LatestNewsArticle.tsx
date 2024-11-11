import { BiError, BiWorld } from 'react-icons/bi';
import { Loader, NewsArticle, PageTitleWithNav } from '../components';
import { useEffect, useState } from 'react';

import { FeedItem } from '../../types/custom';
import bgImage from '../assets/media/images/dash-bg.webp';
import { fetchBBCRSSFeed } from '../utils/functions';

const LatestNewsArticle = () => {
	const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchRSSFeed = async () => {
			setLoading(true);
			try {
				const response = await fetchBBCRSSFeed();

				if (!response) {
					setError('Error Fetching News Feed');
					setLoading(false);
					return;
				}
				setFeedItems(response);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError('Error Fetching News Feed');
				console.error('Failed to fetch RSS feed:', error);
			}
		};

		fetchRSSFeed();
	}, []);

	return (
		<div className='w-full min-h-[100dvh] relative p-4 sm:p-24 flex flex-col items-center justify-start gap-5'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			<PageTitleWithNav title='News' navLink='/dashboard' titleStyles='text-5xl text-white capitalize md:text-7xl text-start' />

			{error ? (
				<div className='flex flex-col items-center justify-center w-full h-full grow'>
					<Loader title='Error!' subText={error} icon={BiError} />
				</div>
			) : loading ? (
				<div className='flex flex-col items-center justify-center w-full h-full grow'>
					<Loader title='Loading Latest News!' subText='Please wait...' icon={BiWorld} />
				</div>
			) : feedItems.length > 0 ? (
				<NewsArticle article={feedItems[0]} />
			) : (
				<div className="w-full max-w-md text-center text-white">
					<Loader title='No News Found!' subText='Please wait...' icon={BiWorld} />
				</div>
			)}
		</div>
	);
};

export default LatestNewsArticle;
