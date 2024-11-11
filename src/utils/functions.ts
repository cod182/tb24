import { MatchType, SportType } from '../../types/custom';

import Papa from 'papaparse';
import cloud from '../assets/media/icons/Clouds_icon.webp';
import rain from '../assets/media/icons/Rain_icon.webp';
import sun from '../assets/media/icons/Sun_icon.webp';

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


export const fetchSportData = async (): Promise<SportType[]> => {
	const proxyUrl =
		process.env.NODE_ENV === 'production'
			? `${window.location.origin}/.netlify/functions/fetch-sport` // Production
			: `http://localhost:8888/.netlify/functions/fetch-sport`; // Local

	try {
		const response = await fetch(proxyUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const csvData = await response.text();

		// Parse the CSV using Papa.parse and return the result directly
		const teamsJson: SportType[] = await new Promise((resolve, reject) => {
			Papa.parse(csvData, {
				complete: (results) => {
					const matchData = results.data;

					const teamsJson = matchData.map((match: MatchType) => {
						const matchObject: SportType = {
							date: '',
							homeTeam: '',
							awayTeam: '',
							fullTimeHomeGoals: 0,
							fullTimeAwayGoals: 0,
							fullTimeResult: '',
							halfTimeHomeGoals: 0,
							halfTimeAwayGoals: 0,
							halfTimeResult: '',
							division: ''
						};

						// Only add properties to matchObject if they have a valid value
						if (match.Date) matchObject.date = match.Date;
						if (match.Time) matchObject.time = match.Time;
						if (match.HomeTeam) matchObject.homeTeam = match.HomeTeam;
						if (match.AwayTeam) matchObject.awayTeam = match.AwayTeam;
						if (match.FTHG) matchObject.fullTimeHomeGoals = parseInt(match.FTHG);
						if (match.FTAG) matchObject.fullTimeAwayGoals = parseInt(match.FTAG);
						if (match.FTR) matchObject.fullTimeResult = match.FTR;
						if (match.HTHG) matchObject.halfTimeHomeGoals = parseInt(match.HTHG);
						if (match.HTAG) matchObject.halfTimeAwayGoals = parseInt(match.HTAG);
						if (match.HTR) matchObject.halfTimeResult = match.HTR;
						if (match.Div) matchObject.division = match.Div;
						if (match.Attendance) matchObject.attendance = parseInt(match.Attendance);
						if (match.Referee) matchObject.referee = match.Referee;
						if (match.HS) matchObject.homeShots = parseInt(match.HS);
						if (match.AS) matchObject.awayShots = parseInt(match.AS);
						if (match.HST) matchObject.homeShotsOnTarget = parseInt(match.HST);
						if (match.AST) matchObject.awayShotsOnTarget = parseInt(match.AST);
						if (match.HHW) matchObject.homeHitWoodwork = parseInt(match.HHW);
						if (match.AHW) matchObject.awayHitWoodwork = parseInt(match.AHW);
						if (match.HC) matchObject.homeCorners = parseInt(match.HC);
						if (match.AC) matchObject.awayCorners = parseInt(match.AC);
						if (match.HF) matchObject.homeFoulsCommitted = parseInt(match.HF);
						if (match.AF) matchObject.awayFoulsCommitted = parseInt(match.AF);
						if (match.HFKC) matchObject.homeFreeKicksConceded = parseInt(match.HFKC);
						if (match.AFKC) matchObject.awayFreeKicksConceded = parseInt(match.AFKC);
						if (match.HO) matchObject.homeOffsides = parseInt(match.HO);
						if (match.AO) matchObject.awayOffsides = parseInt(match.AO);
						if (match.HY) matchObject.homeYellowCards = parseInt(match.HY);
						if (match.AY) matchObject.awayYellowCards = parseInt(match.AY);
						if (match.HR) matchObject.homeRedCards = parseInt(match.HR);
						if (match.AR) matchObject.awayRedCards = parseInt(match.AR);
						if (match.HBP) matchObject.homeBookingPoints = parseInt(match.HBP);
						if (match.ABP) matchObject.awayBookingPoints = parseInt(match.ABP);

						return matchObject;
					});
					teamsJson.pop();

					resolve(teamsJson);
				},
				error: (error: Error) => {
					reject(new Error('Error parsing CSV: ' + error.message));
				},
				header: true,
			});
		});

		return teamsJson;
	} catch (error: unknown) {
		console.error('Error fetching or parsing CSV:', error);
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
