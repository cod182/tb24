export const getGreeting = () => {
	const currentHour = new Date().getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return 'Morning';
	} else if (currentHour >= 12 && currentHour < 18) {
		return 'Day';
	} else {
		return 'Evening';
	}
}

import cloud from '../assets/media/icons/Clouds_icon.webp';
import rain from '../assets/media/icons/Rain_icon.webp';
import sun from '../assets/media/icons/Sun_icon.webp';

export const getWeatherIcon = (weatherType: string) => {
	switch (weatherType.toLowerCase()) {
		case 'clouds':
			return cloud;
		case 'rain':
			return rain;
		case 'sun':
			return sun;
		default:
			return;
	}
};



export const fetchBBCRSSFeed = async (rssFeed: string) => {

	try {
		const response = await fetch(rssFeed);
		if (!response.ok) throw new Error('Error Fetching RSS Feed');

		const text = await response.text();
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(text, 'application/xml');


		const items = Array.from(xmlDoc.querySelectorAll('item')).map((item) => {

			const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];

			return {
				title: item.querySelector('title')?.textContent || '',
				link: item.querySelector('link')?.textContent || '',
				description: item.querySelector('description')?.textContent || '',
				pubDate: item.querySelector('pubDate')?.textContent || '',
				media: mediaThumbnail ? mediaThumbnail.getAttribute('url') ?? '' : '',
			};
		})

		return items;

	} catch (error: unknown) {
		throw new Error(String(error))
	}
};


export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
	};

	// Formatting the date
	const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

	// Adding, th, st, nd, rd
	const day = date.getDate();
	const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
		day === 2 || day === 22 ? 'nd' :
			day === 3 || day === 23 ? 'rd' : 'th';

	// Replace the day with the suffixed version
	return formattedDate.replace(`${day}`, `${day}${suffix}`);
};


export const fetchJsonData = async (url: string) => {
	try {
		const res = await fetch(url);

		const data = await res.json();

		if (!res.ok) throw new Error(data.message);

		return data;

	} catch (error: unknown) {
		throw new Error(String(error))
	}
}