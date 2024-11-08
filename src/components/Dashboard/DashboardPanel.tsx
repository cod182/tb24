import ClothesCard from "./ClothesCard";
import DashboardCard from "./DashboardCard"
import NewsCard from "./NewsCard";
import WeatherCard from "./WeatherCard";

const DashboardPanel = () => {




	return (
		<div className='w-full h-full flex flex-row flex-wrap items-center justify-around gap-10 mx-auto'>


			{/* Weather Card */}
			<WeatherCard />
			{/* News Card */}
			<NewsCard />

			<DashboardCard title='Sport' link='/sport'>
				<p className='text-3xl'>Team Name</p>
				<p className='text-2xl'>Thumpnail</p>
			</DashboardCard>

			<DashboardCard title='Photos'>
				<p className='text-3xl'>Headline</p>
				<p className='text-2xl'>Body</p>
			</DashboardCard>

			<DashboardCard title='Tasks'>
				<p className='text-3xl'>Headline</p>
				<p className='text-2xl'>Body</p>
			</DashboardCard>

			<ClothesCard />

		</div >
	)
}

export default DashboardPanel