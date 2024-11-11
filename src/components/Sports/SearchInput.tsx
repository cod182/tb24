import { SportType } from "../../../types/custom";
import { useState } from "react";

type Props = {
	sportItems: SportType[];
	setSelectedTeam: (team: string) => void
}

const SearchInput = ({ sportItems, setSelectedTeam }: Props) => {

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filteredTeams, setFilteredTeams] = useState<string[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setSearchTerm(inputValue);

		if (inputValue) {
			const matches = sportItems.filter((item) => (item.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()))).map((item) => item.homeTeam);

			const uniqueMatches = Array.from(new Set(matches)).sort((a, b) => a[0].localeCompare(b[0])); // Remove duplicates then sort by first letter

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
		setSelectedTeam(team);
	};


	return (
		<div className="relative">
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				placeholder="Input team name..."
				className="w-full p-2 h-fit py-2 px-4 text-start text-white placeholder:text-white text-5xl font-semibold z-[4] bg-white/0 border-b-white border-b-2"
			// onBlur={() => setIsDropdownOpen(false)}
			/>
			<ul className={`absolute top-[100%]  overflow-y-auto bg-white rounded left-0 w-fit min-w-[150px]  transition-all duration-200 ease ${isDropdownOpen && filteredTeams.length > 0 ? 'max-h-60 mt-1 border' : 'max-h-0 mt-0 border-none'}`}>
				{filteredTeams.map((team, index) => (
					<li
						key={index}
						onClick={() => handleSelectTeam(team)}
						className="w-full p-2 text-xl capitalize cursor-pointer hover:bg-gray-200"
					>
						{team}
					</li>
				))}
			</ul>

		</div>
	)
}

export default SearchInput