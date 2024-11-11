import ClothesCard from "./ClothesCard";
import { Fade } from "react-awesome-reveal";
import NewsCard from "./NewsCard";
import PhotosCard from "./PhotosCard";
import SportCard from "./SportCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const DashboardPanel = () => {
	return (
		<div className='flex flex-row flex-wrap items-center justify-around w-full h-full gap-10 mx-auto'>

			<Fade cascade className='flex w-full h-full sm:w-fit'>

				{/* Weather Card */}
				<WeatherCard />
				{/* News Card */}
				<NewsCard />

				{/* Sport Card */}
				<SportCard />

				{/* Photos Card */}
				<PhotosCard />

				{/* Tasks Card */}
				<TasksCard />

				{/* Clothes Card */}
				<ClothesCard />
			</Fade>

		</div >
	)
}

export default DashboardPanel