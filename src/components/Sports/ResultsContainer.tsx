import { Fade } from "react-awesome-reveal";
import ResultMultiple from "./ResultMultiple";
import ResultSingle from "./ResultSingle";
import { SportType } from "../../../types/custom";

const ResultsContainer = ({ selectedTeam, winData }) => {
	return (
		<>
			{/* Heading */}
			<h2
				className="w-full mb-8 text-4xl text-white text-start"
				aria-live="polite"
			>
				<span className="font-semibold text-yellow-300 capitalize">{selectedTeam}</span> {winData ? "had wins against:" : "did not win any matches :("}
			</h2>

			{/* Results */}
			<div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-y-scroll">
				{winData && winData.length > 0 && selectedTeam && (
					<ul
						className="flex flex-col items-start justify-start w-full h-full gap-6"
						aria-label={`List of matches won by ${selectedTeam}`}
					>
						{winData.map((game, index: number) => {
							if ("matches" in game && Array.isArray(game.matches)) {
								return (
									<Fade key={index} cascade delay={100 * index}>
										<li
											className="w-full text-white"
											aria-label={`Multiple matches won by ${selectedTeam} against ${game.matches[0]?.homeTeam === selectedTeam ? game.matches[0]?.awayTeam : game.matches[0]?.homeTeam}`}
										>
											<ResultMultiple game={game} selectedTeam={selectedTeam} />
										</li>
									</Fade>
								);
							} else
								return (
									<Fade key={index} cascade delay={100 * index}>
										<li
											key={index}
											className="w-full text-white"
											aria-label={`Single match won by ${selectedTeam} against ${(game as SportType).homeTeam === selectedTeam ? (game as SportType).awayTeam : (game as SportType).homeTeam}`}
										>
											<ResultSingle game={game as SportType} selectedTeam={selectedTeam} />
										</li>
									</Fade>
								);
						})}
					</ul>
				)}
			</div></>
	)
}

export default ResultsContainer