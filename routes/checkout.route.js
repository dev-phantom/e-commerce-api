const { Router } = require("express");

const { returnPrice } = require("../controllers/checkout.controller");

const checkOutRouter = Router();

// 1
checkOutRouter.post("/price", returnPrice);

// 2
// checkOutRouter.post("/pay",);

module.exports = checkOutRouter;