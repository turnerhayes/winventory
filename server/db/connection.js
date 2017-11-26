const mongoose = require("mongoose");
const debug = require("debug")("winv:db");

mongoose.Promise = global.Promise;

mongoose.set("debug", debug.enabled);

mongoose.connect(process.env.DB_URL, {
	useMongoClient: true,
});
