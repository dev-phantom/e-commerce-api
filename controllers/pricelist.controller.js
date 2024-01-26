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

module.exports = { addPriceList, getPriceList };
