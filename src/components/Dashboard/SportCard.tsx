import { useEffect, useState } from "react";

import { BiError } from "react-icons/bi";
import DashboardCard from "./DashboardCard"
import { GiSoccerBall } from "react-icons/gi";
import Loader from "../Loader";
import { SportType } from "../../../types/custom";
import { fetchSportData } from "../../utils/functions";

const SportCard = () => {

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();
	const [randomMatch, setRandomMatch] = useState<SportType>()


	useEffect(() => {
		fetchSportsData();
	}, []);

	// functions


	const fetchSportsData = async () => {
		setError('');
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


	const getRandomMatch = (items: SportType[]) => {
		const randomIndex = Math.floor(Math.random() * items.length);
		setRandomMatch(items[randomIndex]);
	}


	return (
		<DashboardCard title='Sport' link='/sports-results' ariaLabel='Read more'>
			<div className="flex flex-col items-center justify-start w-full h-full gap-2 py-2">
				{error ? (
					<Loader title="Error!" subText={error} icon={BiError} refresh={fetchSportsData} />
				) : loading ? (
					<Loader title="Loading Results" subText="Please wait..." icon={GiSoccerBall} />
				) : randomMatch ? (
					<>
						<div className="flex flex-col items-center justify-center w-full h-fit">
							<h2 className="text-3xl">{randomMatch.homeTeam} vs {randomMatch.awayTeam}</h2>
							<p className="text-sm italic text-gray-700">{randomMatch.date}</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<p className="w-full text-xl text-center">Congratulations to <span className="font-semibold">{randomMatch.homeTeam}</span> for&nbsp;{randomMatch.fullTimeHomeGoals > randomMatch.fullTimeAwayGoals
								? 'their win against'
								: randomMatch.fullTimeHomeGoals < randomMatch.fullTimeAwayGoals
									? 'their game against'
									: 'drawing with'}&nbsp;{randomMatch.awayTeam}</p>
							<p className="w-full text-xl text-center">Result: <span className="font-semibold">{randomMatch.fullTimeHomeGoals} - {randomMatch.fullTimeAwayGoals}</span></p>
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