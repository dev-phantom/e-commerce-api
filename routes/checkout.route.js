const { Router } = require("express");

const { returnPrice,returnCheck } = require("../controllers/checkout.controller");

const checkOutRouter = Router();

// 1
checkOutRouter.post("/price", returnPrice);


// 5
checkOutRouter.get("/price:/:id", returnCheck);

// 2
// checkOutRouter.post("/pay",);

module.exports = checkOutRouter;
