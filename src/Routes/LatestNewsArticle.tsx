import { BiArrowBack, BiError, BiWorld } from 'react-icons/bi';
import { Loader, NewsArticle } from '../components';
import { useEffect, useState } from 'react';

import { FeedItem } from '../../types/custom';
import bgImage from '../assets/media/images/dash-bg.webp';
import { fetchBBCRSSFeed } from '../utils/functions';

const LatestNewsArticle = () => {

	const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchRSSFeed = async (RSSFeed: string) => {
			setLoading(true);
			try {
				const response = await fetchBBCRSSFeed(RSSFeed);

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

		fetchRSSFeed('/bbc/news/rss.xml');
	}, []);


	return (
		<div className='w-full min-h-[100dvh] relative p-4 sm:p-24'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			<div className='w-full'>
				<a href="/dashboard" className='group z-[1] px-4 py-2 bg-yellow-300/80 text-black hover:bg-yellow-300/90 rounded-lg flex flex-row items-center justify-center gap-2 w-fit transition-all duration-200 ease'> <BiArrowBack className='inline group-hover:translate-x-[-5px] group-hover:font-bold transition-all duration-200 ease' /> Back</a>
			</div>

			{error ? (
				<Loader title='Error!' subText={error} icon={BiError} />
			) : loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader title='Loading Latest News!' subText='Please wait...' icon={BiWorld} />
				</div>
			) : (
				<NewsArticle article={feedItems[0]} />
			)}
		</div>
	)

}

export default LatestNewsArticle