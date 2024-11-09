exports.handler = async (event, context) => {
	const rssFeedUrl = 'https://tboxapps.therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil';

	try {
		const response = await fetch(rssFeedUrl);

		if (!response.ok) {
			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Error fetching API data' }),
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			};
		}

		const data = await response.text();

		return {
			statusCode: 200,
			body: data,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		};
	} catch (error) {
		console.error('Error fetching API data:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch API data', error: error.message }),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
	}
};
