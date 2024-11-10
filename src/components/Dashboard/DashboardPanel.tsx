import ClothesCard from "./ClothesCard";
import NewsCard from "./NewsCard";
import PhotosCard from "./PhotosCard";
import SportCard from "./SportCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const DashboardPanel = () => {
	return (
		<div className='flex flex-row flex-wrap items-center justify-around w-full h-full gap-10 mx-auto'>


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

		</div >
	)
}

export default DashboardPanel