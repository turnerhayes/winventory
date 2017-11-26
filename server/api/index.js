const express = require("express");
const inventoryRouter = require("./inventory");

const router = express.Router();

router.use("/inventory", inventoryRouter);

module.exports = router;
