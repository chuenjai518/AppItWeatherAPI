const db = require("../_util/db");
const axios = require("axios");
const Weather = db.Weather;

module.exports = {
	getWeather,
};

async function getWeather() {
	const data = await getWeatherFromOpenWeatherMap();

	let weather;

	if (data) {
		weather = new Weather();
		weather.country = data.name;
		weather.weather = data;
		weather.created_date = new Date();

		await weather.save(function (err) {
			if (err) {
				console.log({ err });
				throw err;
			}
		});
	} else {
		weather = await getWeatherLastestRecord();
	}

	let response = { country: weather.country, weather: weather.weather, created_date: weather.created_date };
	return response;
}

async function getWeatherFromOpenWeatherMap() {
	return axios({
		url: `https://api.openweathermap.org/data/2.5/weather?q=Hong Kong&APPID=${process.env.openWeatherMapKey}`,
		method: "get",
	})
		.then(function (result) {
			return result.data;
		})
		.catch(function (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
			return false;
		});
}

async function getWeatherLastestRecord() {
	const data = await Weather.findOne({}).sort({ created_date: -1 });
	return data;
}
