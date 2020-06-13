const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/AppItWeatherAPI", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = {
	Weather: require("../weather/weather.model"),
};
