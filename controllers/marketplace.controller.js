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
    const markets = await Market.find().populate("distributors");
    res.status(200).json({ success: true, data: markets });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch markets" });
  }
}


async function addDistributor(req, res, next) {
  const { name, address, contact, city, marketId } = req.body; 
  console.log(req.body)
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
async function getDistributorById(req, res, next) {
  const { id } = req.params;
  try {
    const distributor = await Distributor.findById(id);
    if (!distributor) {
      return res.status(404).json({ success: false, message: "Distributor not found" });
    }
    res.status(200).json({ success: true, data: distributor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch distributor" });
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

  async function editMarket(req, res, next) {
    const { id, ...marketData } = req.body; // Extract market ID and market data from request body
    try {
      const updatedMarket = await Market.findByIdAndUpdate(id, marketData, { new: true });
      if (!updatedMarket) {
        return res.status(404).json({ success: false, message: "Market not found" });
      }
      res.status(200).json({ success: true, data: updatedMarket });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update market" });
    }
  }
  async function getMarketById(req, res, next) {
    const { id } = req.params;
    try {
      const market = await Market.findById(id);
      if (!market) {
        return res.status(404).json({ success: false, message: "Market not found" });
      }
      res.status(200).json({ success: true, data: market });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch market" });
    }
  }
  async function editDistributor(req, res, next) {
    const { id, ...distributorData } = req.body; // Extract distributor ID and data from request body
    try {
      const updatedDistributor = await Distributor.findByIdAndUpdate(id, distributorData, { new: true });
      if (!updatedDistributor) {
        return res.status(404).json({ success: false, message: "Distributor not found" });
      }
      res.status(200).json({ success: true, data: updatedDistributor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update distributor" });
    }
  }
  
  
module.exports = {
  addMarket,
  addDistributor,
  getAllMarkets,
  getAllDistributors,
  deleteDistributor,
  getDistributorById,
  deleteMarket,
  editMarket,
  getMarketById,
  editDistributor 
};
