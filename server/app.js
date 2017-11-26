const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const HTTPStatusCodes = require("http-status-codes");
const apiRoutes = require("./api");
require("./db/connection");

const app = express();

app.use(logger("dev"));
app.use(cookieParser());

const env = process.env.NODE_ENV || "development";

function throw404(req, res, next) {
	const err = new Error("Not Found");
	err.status = HTTPStatusCodes.NOT_FOUND;
	next(err);
}

app.set("env", env);

const buildDir = path.resolve(__dirname, "..", "build");

app.use("/static", express.static(path.join(buildDir, "static")), throw404);

app.use("/api", apiRoutes, throw404);

app.use("/", (req, res) => res.sendFile(path.join(buildDir, "index.html")));

app.use(throw404);

// Express uses the arity of the function for error handlers, so `next` needs to be here
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	// eslint-disable-next-line no-console
	console.error("error:", err);
	res.locals.message = err.message;
	res.locals.error = env === "development" ? err : {};

	res.status(err.status || HTTPStatusCodes.INTERNAL_SERVER_ERROR);
	res.json({
		error: res.locals.error,
	});
});

module.exports = app;
