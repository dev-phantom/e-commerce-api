const Market = require("../models/Market");
const Distributor = require("../models/Distributor");

async function addMarket(req, res, next) {
  const marketData = req.body;
  const { name, city } = marketData; // Extract name and city from market data
  try {
    // Check if a market with the same name and city already exists
    const existingMarket = await Market.findOne({ name, city });
    if (existingMarket) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Market already exists in this city",
        });
    }

    // If the market doesn't exist, create a new one
    const newMarket = await Market.create(marketData);
    res.status(201).json({ success: true, data: newMarket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add market" });
  }
}

async function getAllMarkets(req, res, next) {
  try {
    const markets = await Market.find().populate("distributors").select("name");
    res.status(200).json({ success: true, data: markets });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch markets" });
  }
}


async function addDistributor(req, res, next) {
  const { name, address, contact, city, marketId } = req.body; // Assuming marketId is provided in the request body
  try {
    const distributor = await Distributor.create({ name, address, contact, city });
    const market = await Market.findById(marketId); // Find the market using marketId
    if (!market) {
      return res.status(404).json({ success: false, message: "Market not found" });
    }
    distributor.markets.push(market); // Add the market to the distributor's markets array
    await distributor.save(); // Save the distributor with the updated markets array
    market.distributors.push(distributor); // Add the distributor to the market's distributors array
    await market.save(); // Save the market with the updated distributors array
    res.status(201).json({ success: true, data: distributor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add distributor" });
  }
}
  

async function getAllDistributors(req, res, next) {
  try {
    const distributor = await Distributor.find().populate("markets");
    res.status(200).json({ success: true, data: distributor });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch distributors" });
  }
}
async function getDistributorsById(req, res, next) {
  const distributorIds = req.body.ids; // Assuming the array of IDs is sent in the request body with the key "ids"

  if (!distributorIds || !Array.isArray(distributorIds)) {
    return res.status(400).json({ success: false, message: "Invalid request format. Please provide an array of distributor IDs in the request body with the key 'ids'." });
  }

  try {
    const distributors = await Distributor.find({ _id: { $in: distributorIds } }); // Find distributors where _id is in the provided array
    res.status(200).json({ success: true, data: distributors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving distributors" });
  }
}


async function deleteDistributor(req, res, next) {
    const distributorId = req.body.id; // Assuming distributorId is provided in the request params
    try {
      // Find the distributor by ID and delete it
      const distributor = await Distributor.findByIdAndDelete(distributorId);
      if (!distributor) {
        return res.status(404).json({ success: false, message: "Distributor not found" });
      }
      // Remove the distributor from associated markets
      await Market.updateMany({ distributors: distributorId }, { $pull: { distributors: distributorId } });
      res.status(200).json({ success: true, data: distributor, message: "Distributor deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete distributor" });
    }
  }

  async function deleteMarket(req, res, next) {
    const marketId = req.body.id; // Assuming marketId is provided in the request body
    try {
      // Find the market by ID and delete it
      const market = await Market.findByIdAndDelete(marketId);
      if (!market) {
        return res.status(404).json({ success: false, message: "Market not found" });
      }
      // Remove the market from associated distributors
      await Distributor.updateMany({ markets: marketId }, { $pull: { markets: marketId } });
      res.status(200).json({ success: true, data: market, message: "Market deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete market" });
    }
  }

 
  
  
  
// async function edit

module.exports = {
  addMarket,
  addDistributor,
  getAllMarkets,
  getAllDistributors,
  deleteDistributor,
  getDistributorsById,
  deleteMarket
};
