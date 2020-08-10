const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Anh Bach'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Anh Bach'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Anh Bach',
		message: 'This is the help page Q&A'
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;

	if (!address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	geocode(address, (error, { lattitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error
			});
		}

		forecast(lattitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}

			res.send({
				address,
				location,
				forecast: forecastData
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Anh Bach',
		errorMessage: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Anh Bach',
		errorMessage: 'Page not found'
	});
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
