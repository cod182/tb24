import { BiError, BiWorld } from 'react-icons/bi';
import { Loader, PageTitleWithNav, SportsResultsArea } from '../components';
import { useEffect, useState } from 'react';

import { SportType } from '../../types/custom';
import bgImage from '../assets/media/images/dash-bg.webp';
import { fetchSportData } from '../utils/functions';

const SportResults = () => {
	// STATES
	const [sportItems, setSportItems] = useState<SportType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	// UseEffects
	useEffect(() => {
		const fetchSportsData = async () => {
			setLoading(true);
			try {
				const response: SportType[] = await fetchSportData();

				if (!response) {
					setError('Error Fetching Sport Items');
					setLoading(false);
					return;
				}
				setLoading(false);
				setSportItems(response);

			} catch (error) {
				setLoading(false);
				setError('Error Fetching Sport Items');
				console.error('Failed to fetch Sport Items:', error);
			}
		};


		fetchSportsData();
	}, []);

	return (
		<div className='w-full min-h-[100dvh] relative p-4 sm:p-24 flex flex-col items-center justify-start gap-5'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			<PageTitleWithNav title='Champions League Challenge' navLink='/dashboard' titleStyles='text-5xl text-white capitalize md:text-7xl text-start' />

			{error ? (
				<div className='flex flex-col items-center justify-center w-full h-full grow'>
					<Loader title='Error!' subText={error} icon={BiError} />
				</div>
			) : loading ? (
				<div className='flex flex-col items-center justify-center w-full h-full grow'>
					<Loader title='Loading Latest News!' subText='Please wait...' icon={BiWorld} />
				</div>
			) : sportItems.length > 0 ? (


				<SportsResultsArea sportItems={sportItems} />


			) : (
				<div className="w-full max-w-md text-center text-white">
					<Loader title='No Sports Results Available!' subText='Please wait...' icon={BiWorld} />
				</div>
			)}
		</div>
	);
};

export default SportResults;
