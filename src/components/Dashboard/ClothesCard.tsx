import React, { useEffect, useState } from 'react'

import { BiError } from 'react-icons/bi';
import { ClothesItem } from '../../../types/custom';
import DashboardCard from './DashboardCard'
import { GiClothesline } from 'react-icons/gi';
import Loader from '../Loader'
import { fetchJsonData } from '../../utils/functions';

type ClothesFrequency = {
	count: number;
	garment: string
}

const ClothesCard = () => {
	const [clothesData, setClothesData] = useState<ClothesFrequency[]>();
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();


	useEffect(() => {
		/*************  ✨ Codeium Command ⭐  *************/
		/**
		 * Fetches the clothes data from the given RSS feed and processes it.
		 * @param {string} RSSFeed - The URL of the RSS feed to fetch
		 * @returns {Promise<void>}
		 */
		/******  708f038c-b9ba-4466-bc07-5207aa2f00c8  *******/
		const getClothesData = async (RSSFeed: string) => {
			setLoading(true);
			try {
				const response = await fetchJsonData(RSSFeed);

				if (!response) {
					setError('Error Fetching Clothes Data');
					setLoading(false);
					return;
				}

				//Gets the payload from the response
				const clothes = response.payload
				const clothesFrequency = getClothingWearFreq(clothes)


				// Map the result to show which clothing was worn and how often

				setClothesData(clothesFrequency);
				setLoading(false);

			} catch (error) {
				setLoading(false);
				setError('Error Fetching Clothes Data');
				console.error('Failed to Clothes Data:', error);
			}
		};

		getClothesData('https://tboxapps.therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil');
	}, []);

	useEffect(() => {

	}, [clothesData])

	// FUNCTIONS
	const getClothingWearFreq = (clothes: ClothesItem[]) => {
		// Reduce the clothes array and count the occurrences of each clothing type retuning an object {item: count}
		const clothingCounts = clothes.reduce((acc: { [x: string]: number; }, item: ClothesItem) => {
			const garment = item.clothe;
			acc[garment] = acc[garment] ? acc[garment] + 1 : 1;
			return acc;
		}, {});

		// Takes the clothing count object and returns an array of objects with the format {garment: string, count: number}
		const frequencyList = Object.entries(clothingCounts).map(([garment, count]) => ({
			garment,
			count
		}));
		return frequencyList
	}

	return (
		<DashboardCard title='Clothes' >
			<div className='flex flex-col items-center justify-center gap-2 w-full h-full'>
				{error ?
					(
						<Loader title='Error!' subText={error} icon={BiError} />
					)
					: loading ? (
						<Loader title='Loading Clothes Info' subText='Please wait...' icon={GiClothesline} />
					) : (
						<>
							<p className='text-3xl text-center'></p>
							<p className='text-xl text-center'></p>

						</>
					)
				}

			</div>
		</DashboardCard>
	)
}

export default ClothesCard