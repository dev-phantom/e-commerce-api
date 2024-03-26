const { Router } = require("express");
const { addMarket, addDistributor,deleteCity,editCity,getAllMarkets, getAllDistributors, deleteDistributor, deleteMarket, getDistributorsById } = require("../controllers/marketplace.controller");

const MarketplaceRouter = Router();

// to add market
MarketplaceRouter.post("/add-market",addMarket);
// to get market
MarketplaceRouter.get("/market",getAllMarkets);
// to add market
MarketplaceRouter.post("/add-distributor",addDistributor);
// to get market
MarketplaceRouter.get("/distributors",getAllDistributors);
//get single distributor
MarketplaceRouter.post("/get-distributor", getDistributorsById)
// to get market
MarketplaceRouter.delete("/delete-distributors",deleteDistributor);
// to get market
MarketplaceRouter.delete("/delete-market",deleteMarket);

//delete city
MarketplaceRouter.delete("/delete/:id",deleteCity);

//edit city
MarketplaceRouter.patch("/edit",editCity);


module.exports = MarketplaceRouter;