const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	image: {
		type: Buffer,
	},
	imageMimeType: {
		type: String
	},
	ranks: {
		type: Object,
		default: {}
	},
});

module.exports = mongoose.model("Item", schema);
