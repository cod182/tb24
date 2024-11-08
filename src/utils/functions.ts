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
				media: mediaThumbnail ? mediaThumbnail.getAttribute('url') : '',
			};
		})

		return items;

	} catch (error: unknown) {
		throw new Error(String(error))
	}
}
	;