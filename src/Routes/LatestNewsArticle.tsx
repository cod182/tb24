import { Loader, NewsArticle } from '../components';
import { useEffect, useState } from 'react';

import { BiWorld } from 'react-icons/bi';
import { FeedItem } from '../../types/custom';
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

	if (!loading) return (<Loader title='Loading News...' subText='Please wait...' icon={BiWorld} />)

	// if (error) return (<Error />)

	return (
		<div>
			{/* <NewsArticle article={feedItems[0]} /> */}
		</div>
	)

}

export default LatestNewsArticle