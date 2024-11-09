import fetch from 'node-fetch';

export const handler = async (event, context) => {
	const rssFeedUrl = 'https://feeds.bbci.co.uk/news/rss.xml';

	try {
		const response = await fetch(rssFeedUrl);
		if (!response.ok) {
			return {
				statusCode: 500,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				},
				body: JSON.stringify({ message: 'Error fetching RSS feed', status: response.status }),
			};
		}

		const data = await response.text();
		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			},
			body: data,
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			},
			body: JSON.stringify({ message: 'Failed to fetch RSS feed', error: error.message }),
		};
	}
};
