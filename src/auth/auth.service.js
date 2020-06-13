const jwt = require("jsonwebtoken");

module.exports = {
	getAuthToken,
};

async function getAuthToken() {
	const token = jwt.sign(
		{
			sub: "user",
			ts: new Date(),
		},
		process.env.JWTSecret,
		{
			expiresIn: "1h",
		}
	);
	console.log({ token });

	return { token };
}
