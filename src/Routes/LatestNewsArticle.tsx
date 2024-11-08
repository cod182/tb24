import { BiError, BiWorld } from 'react-icons/bi';
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

		fetchRSSFeed('https://feeds.bbci.co.uk/news/rss.xml');
	}, []);



	// if (error) return (<Error />)

	return (
		<div className='w-full min-h-[100dvh] relativ flex flex-col items-center justify-center'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			{error ? (
				<Loader title='Error!' subText={error} icon={BiError} />
			) : !loading ? (
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