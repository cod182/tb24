import { useEffect, useState } from "react";

import { Fade } from "react-awesome-reveal";
import ResultsContainer from "./ResultsContainer";
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

		if (selectedTeam) {
			setWinData([]);
			handleLookUpTeam(selectedTeam);
		}
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

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4 py-4 lg:px-24">

			{/* Input Area */}
			<Fade className="z-[999]">
				<SearchInput
					sportItems={sportItems}
					setSelectedTeam={setSelectedTeam}
				/>
			</Fade>

			<div
				className={`px-4 flex flex-col items-start justify-start w-full overflow-hidden transition-all duration-300 ease  ${selectedTeam ? "max-h-[100%] opacity-100 py-4" : "max-h-[0%] opacity-0 py-0"
					}`}
			>
				<ResultsContainer winData={winData} selectedTeam={selectedTeam} />
			</div>

		</section>
	);
};

export default SportsResultsArea;
