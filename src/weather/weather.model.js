const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Weather = new Schema({
	country: { type: String, required: true },
	weather: { type: Object, required: true },
	created_date: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

Weather.set("toJSON", {
	virtuals: true,
});

module.exports = mongoose.model("Weather", Weather);
