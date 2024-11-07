import DashboardCard from "./DashboardCard"
import WeatherCard from "./WeatherCard";

const DashboardPanel = () => {




	return (
		<div className='w-full h-full flex flex-row flex-wrap items-center justify-around gap-10 mx-auto'>

			{/* Dashboard Card */}
			{/* Weather CArd */}
			<WeatherCard />

			<DashboardCard title='News' link='/latestnews'>
				<p className='text-3xl'>Headline</p>
				<p className='text-2xl'>Thumbnail</p>
			</DashboardCard>

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

			<DashboardCard title='Clothes'>
				<p className='text-3xl'>Headline</p>
				<p className='text-2xl'>Body</p>
			</DashboardCard>

		</div >
	)
}

export default DashboardPanel