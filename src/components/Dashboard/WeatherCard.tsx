/// <reference types="vite/client" />
import { BiError, BiWorld } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import DashboardCard from './DashboardCard';
import Loader from '../Loader';
import { getWeatherIcon } from '../../utils/functions';
import { useLocation } from '../../context/useWeatherContext';

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

	const { latitude, longitude, updateLocation, error, setError } = useLocation();




	const [locationLoading, setLocationLoading] = useState(false);
	const [weatherData, setWeatherData] = useState<WeatherDataProps | undefined>();
	const [weatherIcon, setWeatherIcon] = useState<string | undefined>();

	// USE EFFECTS
	useEffect(() => {
		getWeather()
	}, []);

	useEffect(() => {
		fetchCurrentWeather()
	}, [latitude, longitude]);

	// FUNCTIONS

	const getWeather = async () => {
		setLocationLoading(true);
		setError('');
		if (!latitude && !longitude) {
			updateLocation();
			if (latitude && longitude) {
				await fetchCurrentWeather();
			}
		} else {
			fetchCurrentWeather();
		}
		setLocationLoading(false);
	}

	// Gets local weather using coordinates from OpenWeatherAPI
	const fetchCurrentWeather = async () => {
		if (!latitude || !longitude) return;
		setError('');
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`
			);
			const data = await res.json();
			if (!res.ok) setError(data.message);

			setWeatherData(data);
			const icon = getWeatherIcon(data.weather[0].main);

			setWeatherIcon(icon);
		} catch (error: unknown) {
			setError((error as Error)?.message);
		}
	};

	return (
		<DashboardCard title="Weather">
			{error ? (
				<Loader title="Error!" subText={error} icon={BiError} refresh={getWeather} />
			) : locationLoading ? (
				<Loader title="Loading Weather" subText={'Please allow location access'} icon={BiWorld} />

			) : (
				<div className="flex flex-col items-center justify-center w-full h-full">
					<div className="flex flex-row items-center justify-between w-full gap-2 mb-4">
						{/* Icon */}
						<div className="w-[50%] h-auto flex flex-col items-center">
							<img
								src={weatherIcon ? weatherIcon : weatherData && `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
								alt="Weather Icon"
								className="w-full h-full max-w-[140px]"
							/>
						</div>

						{/* Temp */}
						<div className="flex flex-col items-center justify-center w-[50%]">
							<p className="text-5xl">{weatherData && weatherData.main.temp.toFixed(0)}°C</p>
						</div>
					</div>

					<div className="flex flex-col items-center justify-center">
						<p className="text-5xl">{weatherData && weatherData.name}</p>
					</div>
				</div>
			)}
		</DashboardCard>
	);
};

export default WeatherCard;
