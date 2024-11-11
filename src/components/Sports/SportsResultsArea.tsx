import { useEffect, useState } from "react";

import ResultMultiple from "./ResultMultiple";
import ResultSingle from "./ResultSingle";
import SearchInput from "./SearchInput";
import { SportType } from "../../../types/custom";

type Props = {
	sportItems: SportType[];
};

type MultiWinType = {
	matches: SportType[]
}

type WonGamesType = SportType | MultiWinType;

const SportsResultsArea = ({ sportItems }: Props) => {
	const [selectedTeam, setSelectedTeam] = useState<string>();
	const [winData, setWinData] = useState<WonGamesType[]>();

	// USE EFFECTS
	useEffect(() => {
		const handleLookUpTeam = (selectedTeam: string) => {
			const wonGames = getWonGames(selectedTeam);
			setWinData(wonGames);
		};

		if (selectedTeam) handleLookUpTeam(selectedTeam);
	}, [selectedTeam]);

	// Functions
	const getWonGames = (team: string | undefined) => {
		if (!team) return [];

		// Filter for all matches won by the selected team
		const wonGames = sportItems.filter((match) => {
			const { homeTeam, awayTeam, fullTimeHomeGoals, fullTimeAwayGoals } = match;

			// Check if the team won as home or away
			return (
				(homeTeam === team && fullTimeHomeGoals > fullTimeAwayGoals) ||
				(awayTeam === team && fullTimeAwayGoals > fullTimeHomeGoals)
			);
		});

		// Group games by opponents
		const groupedGames: Record<string, SportType[]> = {};

		wonGames.forEach((match) => {
			const opponent = match.homeTeam === team ? match.awayTeam : match.homeTeam;
			if (!groupedGames[opponent]) {
				groupedGames[opponent] = [];
			}
			groupedGames[opponent].push(match);
		});

		return Object.values(groupedGames).map((matches) => {
			if (matches.length === 1) {
				return matches[0];
			}
			return { matches };
		});
	};

	console.log(winData);

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4 py-4 lg:px-24">
			{/* Input Area */}
			<SearchInput
				sportItems={sportItems}
				setSelectedTeam={setSelectedTeam}
			/>

			<div
				className={`px-4 flex flex-col items-start justify-start w-full overflow-hidden transition-all duration-300 ease ${selectedTeam ? "max-h-[100%] opacity-100 py-4 " : "max-h-[0%] opacity-0 py-0"
					}`}
			>
				{/* Heading */}
				<h2
					className="w-full mb-8 text-4xl text-white text-start"
					aria-live="polite"
				>
					<span className="font-semibold text-yellow-300 capitalize">
						{selectedTeam}
					</span>{" "}
					{winData ? "had wins against:" : "did not win any matches :("}
				</h2>

				{/* Results */}
				<div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-y-scroll">
					{winData && winData.length > 0 && selectedTeam && (
						<ul
							className="flex flex-col items-start justify-start w-full h-full gap-6"
							aria-label={`List of matches won by ${selectedTeam}`}
						>
							{winData.map((game, index) => {
								if ("matches" in game && Array.isArray(game.matches)) {
									return (
										<li
											key={index}
											className="w-full text-white"
											aria-label={`Multiple matches won by ${selectedTeam} against ${game.matches[0]?.homeTeam === selectedTeam ? game.matches[0]?.awayTeam : game.matches[0]?.homeTeam}`}
										>
											<ResultMultiple game={game} selectedTeam={selectedTeam} />
										</li>
									);
								} else
									return (
										<li
											key={index}
											className="w-full text-white"
											aria-label={`Single match won by ${selectedTeam} against ${(game as SportType).homeTeam === selectedTeam ? (game as SportType).awayTeam : (game as SportType).homeTeam}`}
										>
											<ResultSingle game={game as SportType} selectedTeam={selectedTeam} />
										</li>
									);
							})}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
};

export default SportsResultsArea;
