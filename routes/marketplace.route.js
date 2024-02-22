const { Router } = require("express");
const { addMarket, addDistributor, getAllMarkets, getAllDistributors, deleteDistributor, deleteMarket } = require("../controllers/marketplace.controller");

const MarketplaceRouter = Router();

// to add market
MarketplaceRouter.post("/add-market",addMarket);
// to get market
MarketplaceRouter.get("/market",getAllMarkets);
// to add market
MarketplaceRouter.post("/add-distributor",addDistributor);
// to get market
MarketplaceRouter.get("/distributors",getAllDistributors);
// to get market
MarketplaceRouter.delete("/delete-distributors",deleteDistributor);
// to get market
MarketplaceRouter.delete("/delete-market",deleteMarket);

module.exports = MarketplaceRouter;