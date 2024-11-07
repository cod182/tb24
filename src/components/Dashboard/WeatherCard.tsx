/// <reference types="vite/client" />
import { useEffect, useState } from 'react'

import { BiWorld } from 'react-icons/bi';
import DashboardCard from './DashboardCard';

type WeatherDataProps = {
	base: string;
	clouds: {
		all: number;
	};
	cod: number;
	coord: {
		lat: number;
		lon: number;
	};
	dt: number;
	id: number;
	main: {
		feels_like: number;
		grnd_level: number;
		humidity: number;
		pressure: number;
		sea_level: number;
		temp: number;
		temp_max: number;
		temp_min: number;
	};
	name: string;
	sys: {
		country: string;
		id: number;
		sunrise: number;
		sunset: number;
		type: number;
	};
	timezone: number;
	visibility: number;
	weather: Array<{
		description: string;
		icon: string;
		id: number;
		main: string;
	}>;
	wind: {
		speed: number;
		deg: number;
	};
};

const WeatherCard = () => {

	const [location, setLocation] = useState<{ latitude: number, longitude: number }>();
	const [locationLoading, setLocationLoading] = useState(false)
	const [error, setError] = useState<string>();
	const [weatherData, setWeatherData] = useState<WeatherDataProps>()



	// USE EFFECTS
	useEffect(() => {
		// Requests then gets current coordinates
		function getCurrentLocation() {
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
		}

		getCurrentLocation();

	}, []);

	useEffect(() => {
		// Gets local weather using coordinates from openweatherapi
		const fetchCurrentWeather = async () => {
			try {
				const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`);
				const data = await res.json();
				console.log(res)
				if (!res.ok) setError(data.message);

				setWeatherData(data)
			} catch (error: unknown) {
				setError((error as Error)?.message)
			}
		}


		fetchCurrentWeather()

	}, [location])
	console.log('weather', weatherData)

	console.log(location)
	return (
		<DashboardCard title='Weather'>
			{error ? <p>{error}</p> : locationLoading ? (
				<div className="w-full h-full flex flex-col items-center justify-center">
					<BiWorld className="animate-spin w-[50px] h-[50px]" />
					<p>
						Loading...
					</p>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center h-full'>

					<div className='flex flex-row items-center justify-center gap-2'>
						{/* Icon */}
						<div className='w-50'>
							{weatherData && weatherData.weather[0].icon && <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather" className='w-[200px] h-[200px]' />}
						</div>

						{/* Temp */}
						<div className='w-50'>
							<p className='text-3xl'>
								{weatherData && weatherData.main.temp.toFixed(0)}°C
							</p>

						</div>
					</div>

					<div className='flex flex-col items-center justify-center'>
						<p className='text-5xl'>
							{weatherData && weatherData.name}
						</p>
					</div>

				</div>
			)}

		</DashboardCard>
	)
}

export default WeatherCard