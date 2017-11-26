#!/usr/bin/env node

require("dotenv").config();

require("./server/db/connection");

const ItemModel = require("./server/db/models/item");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const imageDir = path.resolve(__dirname, "src", "images");

const images = fs.readdirSync(imageDir).filter((filename) => /\.jpe?g/i.test(filename));

Promise.all(
	images.map(
		(imageName) => ItemModel.create({
			_id: path.basename(imageName, path.extname(imageName)),
			image: fs.readFileSync(path.join(imageDir, imageName)),
			imageMimeType: mime.lookup(imageName),
		})
	)
).then(
	() => {
		console.log(`Imported ${images.length} images`);
		process.exit(0);
	}
).catch(
	(err) => {
		console.error(err);
		process.exit(1);
	}
);
