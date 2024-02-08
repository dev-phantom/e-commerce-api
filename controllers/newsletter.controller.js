const News = require("../models/NewsLetter");

// subscribe
module.exports.subcribeNews = async (req, res, next) => {
  const { email } = req.body;

  // check if subscribed
  const exits = await News.findOne({ email });

  if (exits) return res.status(400).send({ message: "Already subscribed!" });

  const saved = await News.create({ email });

  if (saved)
    return res
      .status(201)
      .send({ message: "You have subscribed successfully" });
};
module.exports.getAllNewsLetterSub = async (req, res, next) => {
  try {
    const newsletter = await News.find();
    res.status(200).send(newsletter);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving all orders." });
  }
};
