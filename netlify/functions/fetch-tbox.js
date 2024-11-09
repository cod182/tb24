// import fetch from 'node-fetch';

// export const handler = async (event, context) => {
// 	const rssFeedUrl = 'https://tboxapps.therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil';

// 	try {
// 		const response = await fetch(rssFeedUrl);

// 		if (!response.ok) {
// 			return {
// 				statusCode: 500,
// 				body: JSON.stringify({ message: 'Error fetching RSS feed' }),
// 				headers: {
// 					'Access-Control-Allow-Origin': '*',
// 					'Content-Type': 'application/json',
// 				},
// 			};
// 		}

// 		const data = await response.text();

// 		return {
// 			statusCode: 200,
// 			body: data,
// 			headers: {
// 				'Access-Control-Allow-Origin': '*',
// 				'Content-Type': 'application/json',
// 			},
// 		};
// 	} catch (error) {
// 		console.error('Error fetching RSS feed:', error);
// 		return {
// 			statusCode: 500,
// 			body: JSON.stringify({ message: 'Failed to fetch RSS feed', error: error.message }),
// 			headers: {
// 				'Access-Control-Allow-Origin': '*',
// 			},
// 		};
// 	}
// };

import axios from 'axios';

export const handler = async (event, context) => {
	const rssFeedUrl = 'https://tboxapps.therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil';

	try {
		const response = await axios.get(rssFeedUrl);

		return {
			statusCode: 200,
			body: JSON.stringify(response.data),
			headers: {
				'Access-Control-Allow-Origin': '*', // Allows requests from any origin
				'Content-Type': 'application/json',
			},
		};
	} catch (error) {
		console.error('Error fetching API:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch API data', error: error.message }),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
	}
};
