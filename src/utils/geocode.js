const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
		address
	)}.json?access_token=pk.eyJ1IjoiaWFtYW5oMTk5MCIsImEiOiJja2RqeDBzOGswajhhMnRvODB2bHh2M2k1In0.Qz9OdU61YtCqUNiOmQRfgw`;

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to API');
		} else if (body.features.length === 0) {
			callback('Not found. Please try another search term');
		} else {
			const lattitude = body.features[4].center[1];
			const longitude = body.features[4].center[0];
			const location = body.features[4].place_name;

			callback(undefined, { lattitude, longitude, location });
		}
	});
};

module.exports = geocode;
