exports.handler = async (event, context) => {
	const csvUrl = 'https://www.football-data.co.uk/mmz4281/1718/I1.csv';

	try {
		const response = await fetch(csvUrl);

		if (!response.ok) {
			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Error fetching CSV data' }),
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
				'Content-Type': 'text/csv',
			},
		};
	} catch (error) {
		console.error('Error fetching CSV data:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch CSV data', error: error.message }),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
	}
};
