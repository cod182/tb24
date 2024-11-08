/// <reference types="vite/client" />
import { useEffect, useState } from 'react'

import { BiWorld } from 'react-icons/bi';
import DashboardCard from './DashboardCard';
import { getWeatherIcon } from '../../utils/functions';

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
	const [weatherIcon, setWeatherIcon] = useState<string | undefined>()

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
				if (!res.ok) setError(data.message);

				setWeatherData(data)
				const icon = getWeatherIcon(data.weather[0].main)

				setWeatherIcon(icon);
			} catch (error: unknown) {
				setError((error as Error)?.message)
			}
		}
		if (location?.latitude && location?.longitude) fetchCurrentWeather()

	}, [location])



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
				<div className='flex flex-col items-center justify-center h-full w-full'>

					<div className='flex flex-row items-center justify-between gap-2 w-full mb-4'>
						{/* Icon */}
						<div className='w-[50%] h-auto flex flex-col items-center'>
							<img src={weatherIcon ? weatherIcon : weatherData && `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" className='w-full h-full max-w-[140px]' />
						</div>

						{/* Temp */}
						<div className='flex flex-col items-center justify-center w-[50%]'>
							<p className='text-5xl'>
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