const { Router } = require("express");
const { addMarket, addDistributor, getAllMarkets, getAllDistributors, deleteDistributor, deleteMarket, getDistributorById, editMarket, getMarketById, editDistributor } = require("../controllers/marketplace.controller");

const MarketplaceRouter = Router();

// Add a market
MarketplaceRouter.post("/add-market", addMarket);

// Get all markets
MarketplaceRouter.get("/market", getAllMarkets);

// Get a single market by ID
MarketplaceRouter.get("/market/:id", getMarketById);

// Add a distributor
MarketplaceRouter.post("/add-distributor", addDistributor);

// Get all distributors
MarketplaceRouter.get("/distributors", getAllDistributors);

// Get a single distributor by ID
MarketplaceRouter.get("/get-distributor/:id", getDistributorById);

// Update a market
MarketplaceRouter.put("/market", editMarket);

// Delete a distributor
MarketplaceRouter.delete("/delete-distributors", deleteDistributor);

// Delete a market
MarketplaceRouter.delete("/delete-market", deleteMarket);

//edit a distributor
MarketplaceRouter.put("/distributor", editDistributor);

module.exports = MarketplaceRouter;