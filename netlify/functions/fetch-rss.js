const fetch = require('node-fetch');

exports.handler = async (event, context) => {
	const rssFeedUrl = 'https://feeds.bbci.co.uk/bbc/news/rss.xml';

	try {
		const response = await fetch(rssFeedUrl);

		if (!response.ok) {
			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Error fetching RSS feed' }),
			};
		}

		const data = await response.text();

		return {
			statusCode: 200,
			body: data,
			headers: {
				'Content-Type': 'application/xml', // Set correct content type for RSS
			},
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch RSS feed', error: error.message }),
		};
	}
};
