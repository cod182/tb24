import { useEffect, useState } from "react";

import ResultMultiple from "./ResultMultiple";
import SearchInput from "./SearchInput";
import { SportType } from "../../../types/custom";

type Props = {
	sportItems: SportType[];
}



type WonGamesType =
	| SportType
	| { matches: SportType[] };



const SportsResultsArea = ({ sportItems }: Props) => {
	const [selectedTeam, setSelectedTeam] = useState<string>()
	const [winData, setWinData] = useState<WonGamesType[]>()

	// USE EFFECTS
	useEffect(() => {
		const handleLookUpTeam = (selectedTeam: string) => {

			const wonGames = getWonGames(selectedTeam);

			setWinData(wonGames);
		};

		if (selectedTeam) handleLookUpTeam(selectedTeam);
	}, [selectedTeam])

	// Functions

	const getWonGames = (team: string | undefined) => {
		if (!team) return [];

		// Filter for all matches won by the selected team
		const wonGames = sportItems.filter((match) => {
			const { homeTeam, awayTeam, fullTimeHomeGoals, fullTimeAwayGoals } = match;

			// Check if the team won as home or away
			return (homeTeam === team && fullTimeHomeGoals > fullTimeAwayGoals) ||
				(awayTeam === team && fullTimeAwayGoals > fullTimeHomeGoals);
		});

		// If the team has had a win against another team more thant once
		const groupedGames: Record<string, SportType[]> = {};

		wonGames.forEach((match) => {
			const opponent = match.homeTeam === team ? match.awayTeam : match.homeTeam;
			// If other team doesn't exist make an array
			if (!groupedGames[opponent]) {
				groupedGames[opponent] = [];
			}

			// Adding the match to the array
			groupedGames[opponent].push(match);
		});


		return Object.values(groupedGames).map((matches) => {
			// If there has only been one win against another team, just return an an object
			if (matches.length === 1) {
				return matches[0];
			}

			// If multiple wins against another team, return an array of matches
			return { matches };
		});
	};


	console.log(winData)

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4 py-4 lg:px-24">

			{/* Input Area */}
			<SearchInput sportItems={sportItems} setSelectedTeam={setSelectedTeam} />
			<div className={`px-4 flex gap-4 flex-col items-start justify-start w-full overflow-hidden transition-all duration-300 ease ${selectedTeam ? 'max-h-[100dvh] py-4 ' : 'max-h-[0dvh] py-0'}`}>

				{/* Heading */}
				<h2 className="w-full text-3xl text-white text-start"><span className="font-semibold capitalize">{selectedTeam}</span> has had wins against:</h2>

				{/* Results */}
				<div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-y-scroll grow">
					{winData && winData.length > 0 && selectedTeam ?
						(
							<ul className="flex flex-col items-start justify-start w-full h-full gap-6">
								{winData.map((game, index) => {
									if ('matches' in game && Array.isArray(game.matches)) {
										return ((
											<li key={index} className="w-full text-white">
												<ResultMultiple game={game} selectedTeam={selectedTeam} />
											</li>
										))
									} else {
										return (
											<div key={index}>
												1 win
											</div>
										)
									}
								})}
							</ul>
						) : (
							<p className="text-2xl text-white">No wins against {selectedTeam}</p>
						)}
				</div>
			</div>
		</section >
	)
}

export default SportsResultsArea