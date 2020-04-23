const axios = require('axios');

async function getCoordsForAddress(address) {
	const response = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			address
		)}&key=${process.env.GOOGLE_PLACES_API_KEY}`
	);

	const { data } = response;

	if (!data || data.status === 'ZERO_RESULTS') {
		throw Error('Location not found');
	}

	const coordinates = data.results[0].geometry.location;
	return coordinates;
}

module.exports = {
	getCoordsForAddress,
};
