import { BiError, BiWorld } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import DashboardCard from './DashboardCard'
import Loader from '../Loader';
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
		<DashboardCard title='News' link='/latestnews'>
			<div className='flex flex-col items-center justify-center w-full h-full gap-2'>
				{error ?
					(
						<Loader title='Error!' subText={error} icon={BiError} />
					)
					: loading ? (
						<Loader title='Loading News' subText='Please wait...' icon={BiWorld} />
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