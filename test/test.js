const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");
const should = chai.should();

chai.use(chaiHttp);

let authToken = "";

describe("Authentication", function () {
	describe("Get Token", function () {
		it("should get a token", (done) => {
			chai
				.request(server)
				.get("/auth")
				.end((err, result) => {
					result.should.have.status(200);
					console.log("Result Body:", result.body);
					authToken = result.body.token;
					done();
				});
		});
	});

	describe("Try to get weather information without auth token", function () {
		it("should not get weather information as no auth token", (done) => {
			chai
				.request(server)
				.get("/weather")
				.end((err, result) => {
					result.should.have.status(401);
					done();
				});
		});
	});

	describe("Try to get weather information with auth token", function () {
		it("should get weather information", (done) => {
			chai
				.request(server)
				.get("/weather")
				.set("authorization", `Bearer ${authToken}`)
				.end((err, result) => {
					result.should.have.status(200);
					console.log(result.body);
					done();
				});
		});
	});
});
