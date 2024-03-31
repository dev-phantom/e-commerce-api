const { Router } = require("express");
const { addPriceList,getPriceList,deleteCity,editCity } = require("../controllers/pricelist.controller");

const priceListRouter = Router();

// 1
priceListRouter.post("/add",addPriceList);

// 2
priceListRouter.get("/",getPriceList);

//delete city
priceListRouter.delete("/delete/:id",deleteCity);

//edit city
priceListRouter.patch("/edit",editCity);

module.exports = priceListRouter;