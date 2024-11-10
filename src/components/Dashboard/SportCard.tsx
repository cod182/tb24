import { BiError, BiWorld } from "react-icons/bi";
import { useEffect, useState } from "react";

import DashboardCard from "./DashboardCard"
import Loader from "../Loader";
import { SportType } from "../../../types/custom";
import { fetchSportData } from "../../utils/functions";

const SportCard = () => {

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();
	const [randomMatch, setRandomMatch] = useState<SportType>()

	console.log(randomMatch);

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
				getRandomMatch(response);

			} catch (error) {
				setLoading(false);
				setError('Error Fetching Sport Items');
				console.error('Failed to fetch Sport Items:', error);
			}
		};

		fetchSportsData();
	}, []);

	// functions
	const getRandomMatch = (items: SportType[]) => {
		const randomIndex = Math.floor(Math.random() * items.length);
		setRandomMatch(items[randomIndex]);
	}


	return (
		<DashboardCard title='Sport' link='/sport-results' ariaLabel='Read more'>
			<div className="flex flex-col items-center justify-start w-full h-full gap-2 py-2">
				{error ? (
					<Loader title="Error!" subText={error} icon={BiError} />
				) : loading ? (
					<Loader title="Loading News" subText="Please wait..." icon={BiWorld} />
				) : randomMatch ? (
					<>
						<div className="flex flex-col items-center justify-center w-full h-fit">
							<h2 className="text-3xl">{randomMatch.homeTeam} vs {randomMatch.awayTeam}</h2>
							<p className="text-sm italic text-gray-700">{randomMatch.date}</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<p className="w-full text-2xl text-center">Congratulations to <span className="font-semibold">{randomMatch.homeTeam}</span> for
								{(randomMatch.fullTimeAwayGoals === randomMatch.fullTimeHomeGoals) ? (randomMatch.fullTimeHomeGoals < 1) ? 'drawing with' : `their win against` : 'their game against'}
								{randomMatch.awayTeam}</p>
							<p className="w-full text-xl font-bold text-center">Result: <span className="font-bold">{randomMatch.fullTimeHomeGoals} - {randomMatch.fullTimeAwayGoals}</span></p>
						</div>

					</>
				) : (
					<p>No data available</p>
				)}
			</div>
		</DashboardCard>
	)
}

export default SportCard