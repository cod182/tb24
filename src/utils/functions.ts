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

import { MatchType, SportType } from '../../types/custom';

import Papa from 'papaparse';
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


export const fetchBBCRSSFeed = async () => {
	try {

		const proxyUrl = process.env.NODE_ENV === 'production'
			? `${window.location.origin}/.netlify/functions/fetch-bbc-rss` // Production 
			: `http://localhost:8888/.netlify/functions/fetch-bbc-rss`; // Local 


		const response = await fetch(proxyUrl);

		if (!response.ok) {
			throw new Error(`Error Fetching RSS Feed: ${response.statusText}`);
		}

		// Convert the response to text
		const text = await response.text();

		// Parse the response as XML
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(text, 'application/xml');

		const errorNode = xmlDoc.querySelector('parsererror');
		if (errorNode) {
			throw new Error('Invalid XML response');
		}

		const items = Array.from(xmlDoc.querySelectorAll('item')).map((item) => {
			const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];

			return {
				title: item.querySelector('title')?.textContent || '',
				link: item.querySelector('link')?.textContent || '',
				description: item.querySelector('description')?.textContent || '',
				pubDate: item.querySelector('pubDate')?.textContent || '',
				media: mediaThumbnail ? mediaThumbnail.getAttribute('url') ?? '' : '',
			};
		});

		return items;

	} catch (error: unknown) {
		console.error(`Error fetching RSS feed from:`, error);
		throw new Error(`Error fetching RSS feed: ${String(error)}`);
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


export const fetchJsonData = async () => {
	const proxyUrl = process.env.NODE_ENV === 'production'
		? `${window.location.origin}/.netlify/functions/fetch-tbox` // Production 
		: `http://localhost:8888/.netlify/functions/fetch-tbox`; // Local 
	try {
		const res = await fetch(proxyUrl);


		const data = await res.json();

		if (!res.ok) throw new Error(data.message);

		return data;

	} catch (error: unknown) {
		throw new Error(String(error))
	}
}






export const fetchSportData = async () => {
	const proxyUrl = process.env.NODE_ENV === 'production'
		? `${window.location.origin}/.netlify/functions/fetch-sport` // Production
		: `http://localhost:8888/.netlify/functions/fetch-sport`; // Local

	try {
		const response = await fetch(proxyUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const csvData = await response.text();

		// Parse the CSV with using Papa
		const teamsJson: SportType[] = await new Promise((resolve, reject) => {
			Papa.parse(csvData, {
				complete: function (results) {
					const matchData = results.data;

					const teamsJson = matchData.map((match: MatchType) => {
						return {
							date: match.Date || 'N/A', // Match Date
							time: match.Time || 'N/A', // Match Kick-off Time
							homeTeam: match.HomeTeam || 'Unknown', // Home Team
							awayTeam: match.AwayTeam || 'Unknown', // Away Team
							fullTimeHomeGoals: match.FTHG || 0, // Full Time Home Team Goals
							fullTimeAwayGoals: match.FTAG || 0, // Full Time Away Team Goals
							fullTimeResult: match.FTR || 'N/A', // Full Time Result (H=Home Win, D=Draw, A=Away Win)
							halfTimeHomeGoals: match.HTHG || 0, // Half Time Home Team Goals
							halfTimeAwayGoals: match.HTAG || 0, // Half Time Away Team Goals
							halfTimeResult: match.HTR || 'N/A', // Half Time Result (H=Home Win, D=Draw, A=Away Win)
							division: match.Div || 'N/A', // League Division
							attendance: match.Attendance && parseInt(match.Attendance) || null, // Crowd Attendance
							referee: match.Referee && parseInt(match.Referee) || null, // Match Referee
							homeShots: match.HS && parseInt(match.HS) || null, // Home Team Shots
							awayShots: match.AS && parseInt(match.AS) || null, // Away Team Shots
							homeShotsOnTarget: match.HST && parseInt(match.HST) || null, // Home Team Shots on Target
							awayShotsOnTarget: match.AST && parseInt(match.AST) || null, // Away Team Shots on Target
							homeHitWoodwork: match.HHW && parseInt(match.HHW) || null, // Home Team Hit Woodwork
							awayHitWoodwork: match.AHW && parseInt(match.AHW) || null, // Away Team Hit Woodwork
							homeCorners: match.HC && parseInt(match.HC) || null, // Home Team Corners
							awayCorners: match.AC && parseInt(match.AC) || null, // Away Team Corners
							homeFoulsCommitted: match.HF && parseInt(match.HF) || null, // Home Team Fouls Committed
							awayFoulsCommitted: match.AF && parseInt(match.AF) || null, // Away Team Fouls Committed
							homeFreeKicksConceded: match.HFKC && parseInt(match.HFKC) || null, // Home Team Free Kicks Conceded
							awayFreeKicksConceded: match.AFKC && parseInt(match.AFKC) || null, // Away Team Free Kicks Conceded
							homeOffsides: match.HO && parseInt(match.HO) || null, // Home Team Offsides
							awayOffsides: match.AO && parseInt(match.AO) || null, // Away Team Offsides
							homeYellowCards: match.HY && parseInt(match.HY) || null, // Home Team Yellow Cards
							awayYellowCards: match.AY && parseInt(match.AY) || null, // Away Team Yellow Cards
							homeRedCards: match.HR && parseInt(match.HR) || null, // Home Team Red Cards
							awayRedCards: match.AR && parseInt(match.AR) || null, // Away Team Red Cards
							homeBookingPoints: match.HBP && parseInt(match.HBP) || null, // Home Team Booking Points (10 = yellow, 25 = red)
							awayBookingPoints: match.ABP && parseInt(match.ABP) || null, // Away Team Booking Points (10 = yellow, 25 = red)
						};
					});

					resolve(teamsJson);
				},
				error: function (error: Error) {
					reject(new Error('Error parsing CSV: ' + error.message));
				},
				header: true,
			});
		});

		return teamsJson;

	} catch (error: unknown) {
		console.error("Error fetching or parsing CSV:", error);
		throw new Error(String(error));
	}
};




export const resizeImage = async (
	image: File,
	width: number,
	height: number
): Promise<File> => {
	const img = new Image();

	// Convert file to a url
	img.src = URL.createObjectURL(image);

	await new Promise<void>((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = (error) => reject(error);
	});

	// Create a canvas to resize the image
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error("Failed to get canvas context");

	canvas.width = width;
	canvas.height = height;

	// Using Canvas to create the image
	ctx.drawImage(img, 0, 0, width, height);

	// convert the cancas to a file
	return new Promise<File>((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					// Create a new File with the same name and type as the original
					const resizedFile = new File([blob], image.name, {
						type: image.type || 'image/jpeg',
						lastModified: Date.now(),
					});
					resolve(resizedFile);
				} else {
					reject(new Error("Failed to convert canvas to Blob"));
				}
			},
			image.type || 'image/jpeg'
		);
	});
};
