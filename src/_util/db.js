const mongoose = require("mongoose");

mongoose.connect(process.env.databaseString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = {
	Weather: require("../weather/weather.model"),
};
