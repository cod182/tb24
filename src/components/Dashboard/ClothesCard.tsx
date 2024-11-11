import {
	ArcElement,
	CategoryScale,
	Chart as ChartJS,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';

import { BiError } from 'react-icons/bi';
import { ClothesItem } from '../../../types/custom';
import DashboardCard from './DashboardCard';
import { GiClothesline } from 'react-icons/gi';
import Loader from '../Loader';
import { Pie } from 'react-chartjs-2';
import { fetchJsonData } from '../../utils/functions';

type ClothesFrequency = {
	count: number;
	garment: string;
};

type PieDataProps = {
	labels: string[];
	datasets: {
		data: number[];
		backgroundColor: string[];
		borderColor: string[];
		borderWidth: number;
	}[];
};


ChartJS.register(ArcElement, CategoryScale, Tooltip);

const ClothesCard = () => {
	const [clothesData, setClothesData] = useState<ClothesFrequency[]>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [pieData, setPieData] = useState<PieDataProps>();

	useEffect(() => {
		getClothesData();
	}, []);

	useEffect(() => {
		if (clothesData) {
			// Process pie chart data when clothesData changes
			const labels = clothesData.map(({ garment }) => garment.toUpperCase());
			const count = clothesData.map(({ count }) => count);

			setPieData({
				labels: labels,
				datasets: [
					{
						data: count,
						backgroundColor: ['#d0392f', '#75D02F', '#2FC6D0', '#8A2FD0', '#3341cc', '#c7ea15'],
						borderColor: ['#d0392f', '#75D02F', '#2FC6D0', '#8A2FD0', '#3341cc', '#c7ea15'],
						borderWidth: 1,
					},
				],
			});
		}
	}, [clothesData]); // This effect runs when clothesData changes

	// FUNCTIONS

	const getClothesData = async () => {
		setLoading(true);
		try {
			const response = await fetchJsonData();

			if (!response) {
				setError('Error Fetching Clothes Data');
				setLoading(false);
				return;
			}

			const clothes = response.payload;
			const clothesFrequency = getClothingWearFreq(clothes);

			setClothesData(clothesFrequency);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError('Error Fetching Clothes Data');
			console.error('Failed to fetch clothes data:', error);
		}
	};

	// Function to calculate the clothing frequency
	const getClothingWearFreq = (clothes: ClothesItem[]) => {
		const clothingCounts = clothes.reduce((acc: { [x: string]: number }, item: ClothesItem) => {
			const garment = item.clothe;
			acc[garment] = acc[garment] ? acc[garment] + 1 : 1;
			return acc;
		}, {});

		return Object.entries(clothingCounts).map(([garment, count]) => ({
			garment,
			count,
		}));
	};


	return (
		<DashboardCard title='Clothes'>
			<div className='flex flex-col items-center justify-center w-full h-full gap-2'>
				{error ? (
					<Loader title='Error!' subText={error} icon={BiError} refresh={getClothesData} />
				) : loading ? (
					<Loader title='Loading Clothes Info' subText='Please wait...' icon={GiClothesline} />
				) : pieData ? (

					<Pie data={pieData} className='max-h-[200px] w-auto' />

				) : null}
			</div>
		</DashboardCard>
	);
};

export default ClothesCard;
