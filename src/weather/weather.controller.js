const express = require("express");
const router = express.Router();
const weatherService = require("./weather.service");

module.exports = router;

router.get("/", getWeather);

function getWeather(req, res, next) {
	console.log("In getWeather");
	weatherService
		.getWeather()
		.then((data) => res.json(data))
		.catch((err) => next(err));
}
