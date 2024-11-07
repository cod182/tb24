import { useEffect, useState } from "react"

import { BiWorld } from "react-icons/bi";
import DashboardCard from "./DashboardCard"

const DashboardPanel = () => {

	const [location, setLocation] = useState<{ latitude: number, longitude: number }>();
	const [locationLoading, setLocationLoading] = useState(false)
	const [error, setError] = useState<string>();
	const [weatherData, setWeatherData] = useState({})

	useEffect(() => {
		const getCurrentLocation = () => {
			setLocationLoading(true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;

						setLocation({ latitude, longitude });
						setLocationLoading(position.coords && false);
					},
					(err) => {
						setLocationLoading(false);
						setError('Error getting location');
						console.error(err);
					}
				);
			} else {
				setLocationLoading(false);
				setError('Geolocation is not supported by this browser.');
			}
		};

		getCurrentLocation();

	}, []);

	useEffect(() => {
		const fetchCurrentWeather = async () => {
			try {
				const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`);

				const data = await res.json();

				setWeatherData(data)
			} catch (error) {
				throw new Error(error)
			}
		}


		fetchCurrentWeather()

	}, [location])
	console.log('weather', weatherData)

	console.log(location)


	return (
		<div className='w-full h-full flex flex-row flex-wrap items-center justify-around gap-10 mx-auto'>

			{/* Dashboard Card */}
			<DashboardCard title='Weather'>
				{locationLoading ? (
					<div className="w-full h-full flex flex-col items-center justify-center">
						<BiWorld className="animate-spin w-[50px] h-[50px]" />
						<p>
							Loading...
						</p>
					</div>
				) : (
					<>
						<p className='text-3xl'>Headline</p>
						<p className='text-2xl'>Body</p>
					</>
				)}

			</DashboardCard>

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