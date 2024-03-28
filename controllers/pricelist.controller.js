const PriceList = require("../models/PriceList");

// add
async function addPriceList(req, res, next) {
  try {
    const { city, estimatePrice } = req.body;

    if (!city || !estimatePrice) {
      return res.status(422).send({ message: "All fields are required!" });
    }

    PriceList.create({ city, estimatePrice })
      .then((data) => res.status(201).send({ data }))
      .catch(() => res.status(201).send({ message: "An error occured!" }));
  } catch (e) {
    next(e);
  }
}

// get
async function getPriceList(req, res, next) {
  try {
    const prices = await PriceList.find();
    return res.status(200).send({ prices });
  } catch (e) {
    next(e);
  }
}

 async function deleteCity(req, res, next) {
    try {
      await Market.findByIdAndDelete(req.params.id);
      return res.status(200).send({ message: "Deleted!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete city" });
    }
  }

  async function editCity(req, res, next) {
    const { city,id } = req.body;
    try {
     const getCity = await Market.findById(id);
     if(getCity){
      getCity.city = city
      await getCity.save();
     } else {
      return res.status(400).send({ message: "Invald city ID"});
     }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to edit city" });
    }
  }

module.exports = { addPriceList, getPriceList,deleteCity,editCity };
