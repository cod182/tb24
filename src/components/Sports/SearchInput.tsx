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
				className="w-full p-2 px-4 py-2 text-2xl font-semibold text-white border-b-2 h-fit text-start placeholder:text-white sm:text-5xl bg-white/0 border-b-white"
				aria-label="Search for a team to view its won games"
			/>
			<ul className={`absolute top-[100%] overflow-y-scroll bg-white rounded left-0 w-[90%] min-w-[150px] transition-all duration-200 ease ${isDropdownOpen && filteredTeams.length > 0 ? 'max-h-60 mt-1 border-2' : 'max-h-0 mt-0 border-none'}`}>
				{filteredTeams.map((team, index) => (
					<li
						key={index}
						onClick={() => handleSelectTeam(team)}
						className="w-full h-full p-2 text-xl capitalize cursor-pointer hover:bg-gray-200"
					>
						{team}
					</li>
				))}
			</ul>

		</div>
	)
}

export default SearchInput