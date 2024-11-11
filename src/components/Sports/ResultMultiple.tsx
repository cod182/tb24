import { FaArrowCircleDown } from 'react-icons/fa';
import { SportType } from '../../../types/custom';
import { useState } from 'react';

type Props = {
	game: { matches: SportType[] };
	selectedTeam: string;
};

const ResultMultiple = ({ game, selectedTeam }: Props) => {
	const [detailStatus, setDetailStatus] = useState(false);

	return (
		<>
			<div
				className="flex flex-row items-center justify-start gap-4 transition-all duration-200 cursor-pointer ease w-fit hover:text-yellow-300"
				onClick={() => setDetailStatus(!detailStatus)}
				aria-expanded={detailStatus}
				aria-controls="match-details"
			>
				<h3 className="text-3xl font-bold">
					{game.matches[0].awayTeam === selectedTeam
						? game.matches[0].homeTeam
						: game.matches[0].awayTeam}{" "}
					({game.matches.length} wins)
				</h3>
				<FaArrowCircleDown
					className={`w-[25px] h-[25px] transition-transform duration-200 ease hidden sm:inline ${detailStatus ? "rotate-180" : "rotate-0"
						}`}
					aria-hidden="true"
				/>
			</div>

			<ul id="match-details">
				{game.matches.map((match, index) => (
					<li
						key={index}
						className={`flex flex-col items-start justify-start flex-wrap w-full gap-2 px-2 transition-all duration-200 ease ${detailStatus ? "max-h-[500px] overflow-y-scroll py-2" : "max-h-[0px] overflow-hidden py-0"
							}`}
						aria-label={`Match ${index + 1}: ${selectedTeam} vs ${match.homeTeam === selectedTeam ? match.awayTeam : match.homeTeam
							}, date: ${match.date}`}
					>
						<p className="text-xl font-semibold underline">Match {index + 1}</p>
						<div className="flex flex-row flex-wrap items-start justify-start w-full gap-2">
							<p className="px-2 py-[5px] bg-gray-400/70 border-yellow-300 border-[1px] rounded-full">
								Date: {match.date}
							</p>
							<p
								className={`px-4 py-[5px] bg-gray-400/70 border-yellow-300 border-[1px] rounded-full ${selectedTeam.toLowerCase() === match.homeTeam.toLowerCase() &&
									"font-bold bg-yellow-300 text-black border-gray-400"
									}`}
							>
								Home Team: {match.homeTeam} - {match.fullTimeHomeGoals} goals
							</p>
							<p
								className={`px-4 py-[5px] bg-gray-400/70 border-yellow-300 border-[1px] rounded-full ${selectedTeam.toLowerCase() === match.awayTeam.toLowerCase() &&
									"font-bold bg-yellow-300 text-black border-gray-400"
									}`}
							>
								Away Team: {match.awayTeam} - {match.fullTimeAwayGoals} goals
							</p>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default ResultMultiple;
