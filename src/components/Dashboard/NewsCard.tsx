import { useEffect, useState } from 'react';

import { BiWorld } from 'react-icons/bi';
import DashboardCard from './DashboardCard'
import { fetchBBCRSSFeed } from '../../utils/functions';

type FeedItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
}

const NewsCard = () => {

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


	return (
		<DashboardCard title='News' link='/latestnews'>
			<div className='flex flex-col items-center justify-center gap-2 w-full h-full'>
				{error ?
					(<p>{error}</p>)
					: loading ? (
						<div className="w-full h-full flex flex-col items-center justify-center">
							<BiWorld className="animate-spin w-[50px] h-[50px]" />
							<p>
								Loading...
							</p>
						</div>
					) : (
						<>
							<p className='text-3xl text-center'>{feedItems[0].title.length > 25
								? `${feedItems[0].title.slice(0, 25)}...`
								: feedItems[0].title}</p>
							<p className='text-xl text-center'>{feedItems[0].description.length > 125
								? `${feedItems[0].description.slice(0, 125)}...`
								: feedItems[0].description}</p>

						</>
					)
				}

			</div>
		</DashboardCard>
	)
}

export default NewsCard