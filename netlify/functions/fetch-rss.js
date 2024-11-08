import fetch from 'node-fetch';

export const handler = async (event, context) => {
	const rssFeedUrl = 'https://feeds.bbci.co.uk/news/rss.xml';

	try {
		const response = await fetch(rssFeedUrl);

		if (!response.ok) {
			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Error fetching RSS feed' }),
				headers: {
					'Access-Control-Allow-Origin': '*', // Allow requests from any origin
					'Content-Type': 'application/json',
				},
			};
		}

		const data = await response.text();
		console.log(data)

		return {
			statusCode: 200,
			body: data,
			headers: {
				'Access-Control-Allow-Origin': '*', // Allow requests from any origin
				'Content-Type': 'application/xml', // Correct content type for RSS
			},
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch RSS feed', error: error.message }),
			headers: {
				'Access-Control-Allow-Origin': '*', // Allow requests from any origin
			},
		};
	}
};
