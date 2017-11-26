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
	imageLastModified: {
		type: Date,
		default: Date.now,
		set: (newVal) => {
			if (newVal !== this.imageLastModified) {
				this._dateModified = true;
			}

			this.imageLastModified = newVal;
		}
	},
	ranks: {
		type: Object,
		default: {}
	},
});

schema.pre("save", (next) => {
	if (this._dateModified) {
		this.imageLastModified = Date.now();
		this._dateModified = false;
	}

	next();
});

module.exports = mongoose.model("Item", schema);
