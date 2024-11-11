import { BiDownArrow } from 'react-icons/bi'
import { SportType } from '../../../types/custom';

type Props = {
	game: { matches: SportType[] };
	selectedTeam: string;
}

const ResultMultiple = ({ game, selectedTeam }: Props) => {
	return (
		<>
			<div className="flex flex-row items-center justify-start gap-4 w-fit">
				<h3 className="text-2xl font-bold">
					{game.matches.length} wins against {game.matches[0].awayTeam === selectedTeam ? game.matches[0].homeTeam : game.matches[0].awayTeam}
				</h3>
				<BiDownArrow className="w-4 h-4 transition-all duration-200 cursor-pointer hover:text-yellow-300 eases" />
			</div>
			<ul>
				{game.matches.map((match, index) => (
					<li key={index} className="flex flex-col items-start justify-center gap-2 p-2">
						<p>Match {index + 1}</p>
						<div className="flex flex-row items-center justify-center gap-2">
							<p className="px-2 py-[5px] bg-gray-400/70 rounded-full">Date: {match.date}</p>
							<p className="px-2 py-[5px] bg-gray-400/70 rounded-full">Home Team: {match.homeTeam} - {match.fullTimeHomeGoals} goals</p>
							<p className="px-2 py-[5px] bg-gray-400/70 rounded-full">Away Team: {match.awayTeam} - {match.fullTimeAwayGoals} goals</p>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default ResultMultiple