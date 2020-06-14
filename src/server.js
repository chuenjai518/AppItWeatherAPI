require("dotenv").config();

const express = require("express");
const jwt = require("./_util/jwt");
const errorHandler = require("./_util/errorHandler");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use(jwt());

app.use("/weather", require("./weather/weather.controller"));
app.use("/auth", require("./auth/auth.controller"));

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server Started at PORT ${port}`);
});

module.exports = app;
