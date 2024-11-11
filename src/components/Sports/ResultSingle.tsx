import { FaArrowCircleDown } from 'react-icons/fa';
import { SportType } from '../../../types/custom';
import { useState } from 'react';

type Props = {
	game: SportType;
	selectedTeam: string;
};

const ResultSingle = ({ game, selectedTeam }: Props) => {
	const [detailStatus, setDetailStatus] = useState(false);

	return (
		<>
			<div
				className="flex flex-row items-center justify-start transition-all duration-200 cursor-pointer sm:gap-4 ease w-fit hover:text-yellow-300"
				onClick={() => setDetailStatus(!detailStatus)}
				aria-expanded={detailStatus}
				aria-controls="match-details"
			>
				<h3 className="text-3xl font-bold">
					{game.awayTeam === selectedTeam ? game.homeTeam : game.awayTeam}
				</h3>
				<FaArrowCircleDown
					className={`w-[25px] h-[25px] transition-all duration-200 ease  ${detailStatus ? "rotate-180" : "rotate-0"
						}`}
					aria-hidden="true"
				/>
			</div>
			<ul id="match-details">
				<li
					className={`flex flex-col items-start justify-start flex-wrap w-full gap-2 px-2 transition-all duration-200 ease ${detailStatus ? "max-h-[500px] overflow-y-scroll py-2" : "max-h-[0px] overflow-hidden py-0"
						}`}
					aria-label={`Match between ${game.homeTeam} and ${game.awayTeam}, Date: ${game.date}, ${game.homeTeam} scored ${game.fullTimeHomeGoals} goals, ${game.awayTeam} scored ${game.fullTimeAwayGoals} goals`}
				>
					<div className="flex flex-row flex-wrap items-start justify-start w-full gap-2">
						<p className="px-2 py-[5px] bg-gray-400/70 border-yellow-300 border-[1px] rounded-full">
							Date: {game.date}
						</p>
						<p
							className={`px-4 py-[5px] bg-gray-400/70 border-yellow-300 border-[1px] rounded-full ${selectedTeam.toLowerCase() === game.homeTeam.toLowerCase() &&
								"font-bold bg-yellow-300 text-black border-gray-400"
								}`}
						>
							Home Team: {game.homeTeam} - {game.fullTimeHomeGoals} goals
						</p>
						<p
							className={`px-4 py-[5px] bg-gray-400/70 border-yellow-300 border-[1px] rounded-full ${selectedTeam.toLowerCase() === game.awayTeam.toLowerCase() &&
								"font-bold bg-yellow-300 text-black border-gray-400"
								}`}
						>
							Away Team: {game.awayTeam} - {game.fullTimeAwayGoals} goals
						</p>
					</div>
				</li>
			</ul>
		</>
	);
};

export default ResultSingle;
