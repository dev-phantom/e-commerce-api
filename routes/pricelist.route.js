const { Router } = require("express");
const { addPriceList,getPriceList } = require("../controllers/pricelist.controller");

const priceListRouter = Router();

// 1
priceListRouter.post("/add",addPriceList);

// 2
priceListRouter.get("/",getPriceList);

module.exports = priceListRouter;