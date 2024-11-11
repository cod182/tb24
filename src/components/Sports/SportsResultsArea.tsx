import { useEffect, useState } from "react";

import SearchInput from "./SearchInput";
import { SportType } from "../../../types/custom";

type Props = {
	sportItems: SportType[];
}

const SportsResultsArea = ({ sportItems }: Props) => {
	const [selectedTeam, setSelectedTeam] = useState<string>()
	const [teamData, setTeamData] = useState<SportType>()

	useEffect(() => {
		const handleLookUpTeam = (selectedTeam: string) => {

			console.log('Team Changed', selectedTeam)
			// setTeamData()
		};

		if (selectedTeam) handleLookUpTeam(selectedTeam);
	}, [selectedTeam])

	console.log(selectedTeam ? 'present' : 'not present')

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4 py-4 lg:px-24">

			{/* Input Area */}
			<SearchInput sportItems={sportItems} setSelectedTeam={setSelectedTeam} />
			<div className={`px-4 flex gap-4 flex-col items-center justify-center w-full overflow-hidden transition-all duration-300 ease ${selectedTeam ? 'max-h-[1000px] py-4 ' : 'max-h-[0px] py-0'}`}>

				{/* Heading */}
				<h2 className="w-full text-3xl text-white capitalize text-start"><span>{selectedTeam}</span> has had wins against:</h2>

				{/* Results */}
				<div>
					TEST
				</div>
			</div>
		</section >
	)
}

export default SportsResultsArea