const express = require("express");
const bodyParser = require("body-parser");
const HTTPStatusCodes = require("http-status-codes");
const etag = require("etag");
const assert = require("assert");
const ItemModel = require("../db/models/item");

const router = express.Router();

function prepareItem(item) {
	item = item.toObject();
	delete item.image;
	delete item.__v;
	item.id = item._id;
	delete item._id;
	item.ranks = item.ranks || {};
	return item;
}

function setOrUnsetRank({ user, rank , id, res, next }) {
	const operation = rank ? "$set" : "$unset";

	ItemModel.update({ _id: id, }, { [operation]: {[`ranks.${user}`]: rank } }).then(
		() => res.status(HTTPStatusCodes.NO_CONTENT).send()
	).catch(next);
}

router.route("/")
	.get(
		(req, res, next) => {
			ItemModel.find().then(
				(items) => res.json(items.map(prepareItem).reduce(
						(items, item) => {
							items[item.id] = item;

							return items;
						},
						{}
					)
				)
			).catch(next);
		}
	);

router.route("/:id")
	.get(
		(req, res, next) => {
			ItemModel.findById(req.params.id).then(
				(item) => res.json(prepareItem(item))
			).catch(next);
		}
	);

router.route("/:id/image")
	.get(
		(req, res, next) => {
			ItemModel.findById(req.params.id).then(
				(item) => {
					res.type(item.imageMimeType || "jpeg")
						.set("Last-Modified", item.imageLastModified)
						.set("ETag", etag(item.image));

					if (req.fresh) {
						res.status(HTTPStatusCodes.NOT_MODIFIED).send();
					}
					else {
						res.status(HTTPStatusCodes.OK).send(item.image);
					}
				}
			).catch(next);
		}
	);

router.route("/:id/ranks")
	.patch(
		bodyParser.json(),
		(req, res, next) => {
			try {
				assert(req.body.user, "user parameter is required");
				assert(req.body.rank, "rank parameter is required");
			}
			catch(ex) {
				next(ex);
				return;
			}
			setOrUnsetRank({ ...req.body, id: req.params.id, res, next });
		}
	).delete(
		bodyParser.json(),
		(req, res, next) => {
			try {
				assert(req.body.user, "user parameter is required");
			}
			catch(ex) {
				next(ex);
				return;
			}
			setOrUnsetRank({ ...req.body, id: req.params.id, res, next });
		}
	);

module.exports = router;
