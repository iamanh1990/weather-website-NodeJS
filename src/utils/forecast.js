const request = require('request');

const forecast = (lattitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=366e12a4a4e71f5397d04e6433146608&query=${lattitude},${longitude}&units=f`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to fetch API');
		} else if (body.error) {
			callback('Not found. Please try another search term');
		} else {
			const data = `It is currently ${body.current.temperature} degrees out, feels like ${body.current
				.feelslike} degrees out. The weather is ${body.current
				.weather_descriptions[0]}. The current temperature is ${body.current
				.temperature} with the humidity of ${body.current.humidity}%`;
			callback(undefined, data);
		}
	});
};

module.exports = forecast;
