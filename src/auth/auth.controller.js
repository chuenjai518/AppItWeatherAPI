const express = require("express");
const router = express.Router();
const authService = require("./auth.service");

module.exports = router;

router.get("/", getAuthToken);

function getAuthToken(req, res, next) {
	console.log("In getAuthToken");
	authService
		.getAuthToken()
		.then((data) => res.json(data))
		.catch((err) => next(err));
}
