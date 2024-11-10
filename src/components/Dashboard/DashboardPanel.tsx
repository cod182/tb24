import ClothesCard from "./ClothesCard";
import DashboardCard from "./DashboardCard"
import NewsCard from "./NewsCard";
import PhotosCard from "./PhotosCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const DashboardPanel = () => {
	return (
		<div className='flex flex-row flex-wrap items-center justify-around w-full h-full gap-10 mx-auto'>


			{/* Weather Card */}
			<WeatherCard />
			{/* News Card */}
			<NewsCard />

			<DashboardCard title='Sport' link='/sport'>
				<p className='text-3xl'>Team Name</p>
				<p className='text-2xl'>Thumpnail</p>
			</DashboardCard>
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