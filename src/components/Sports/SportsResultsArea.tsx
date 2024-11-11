import { SportType } from "../../../types/custom";
import { useState } from "react";

type Props = {
	sportItems: SportType[];
}

const SportsResultsArea = ({ sportItems }: Props) => {

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filteredTeams, setFilteredTeams] = useState<string[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	console.log(sportItems)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setSearchTerm(inputValue);

		if (inputValue) {
			const matches = sportItems.filter((item) => (item.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()))).map((item) => item.homeTeam);

			const uniqueMatches = Array.from(new Set(matches)); // Remove duplicates

			setFilteredTeams(uniqueMatches);
			setIsDropdownOpen(true);
		} else {
			setFilteredTeams([]);
			setIsDropdownOpen(false);
		}
	};

	const handleSelectTeam = (team: string) => {
		setSearchTerm(team);
		setIsDropdownOpen(false);
	};

	return (
		<section>
			{/* Input Area */}
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder="Search team name..."
					className="w-full p-2 border rounded"
				/>

				{isDropdownOpen && filteredTeams.length > 0 && (
					<ul className="absolute top-[100%] mt-1 overflow-y-auto bg-white border rounded left-0 w-fit min-w-[150px] max-h-60">
						{filteredTeams.map((team, index) => (
							<li
								key={index}
								onClick={() => handleSelectTeam(team)}
								className="p-2 cursor-pointer hover:bg-gray-200"
							>
								{team}
							</li>
						))}
					</ul>
				)}
			</div>

		</section>
	)
}

export default SportsResultsArea