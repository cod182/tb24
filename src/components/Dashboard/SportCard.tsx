import { BiError, BiWorld } from "react-icons/bi";
import { useEffect, useState } from "react";

import DashboardCard from "./DashboardCard"
import Loader from "../Loader";
import { fetchSportData } from "../../utils/functions";

const SportCard = () => {

	const [sportItems, setSportItems] = useState([]);
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchSportsData = async () => {
			setLoading(true);
			try {
				const response = await fetchSportData();

				if (!response) {
					setError('Error Fetching Sport Items');
					setLoading(false);
					return;
				}
				setSportItems(response);
				setLoading(false);

			} catch (error) {
				setLoading(false);
				setError('Error Fetching Sport Items');
				console.error('Failed to fetch Sport Items:', error);
			}
		};

		fetchSportsData();
	}, []);

	return (
		<DashboardCard title='News' link='/latestnews' ariaLabel='Read more'>
			<div className='flex flex-col items-center justify-center w-full h-full gap-2'>
				{error ?
					(
						<Loader title='Error!' subText={error} icon={BiError} />
					)
					: loading ? (
						<Loader title='Loading News' subText='Please wait...' icon={BiWorld} />
					) : (
						<div></div>
					)
				}
			</div>
		</DashboardCard>
	)
}

export default SportCard