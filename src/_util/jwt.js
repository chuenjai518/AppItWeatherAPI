const expressJwt = require("express-jwt");

module.exports = jwt;

function jwt() {
	const secret = process.env.JWTSecret;
	return expressJwt({
		secret,
		getToken,
	}).unless({
		path: [
			// public routes that don't require authentication
			"/auth",
		],
	});
}

function getToken(req) {
	if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		return req.headers.authorization.split(" ")[1];
	}
	return null;
}
