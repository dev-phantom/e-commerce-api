const News = require("../models/NewsLetter");

// subscribe
module.exports.subcribeNews = async (req,res,next) => {
	const { email } = req.body;

	// check if subscribed
	const exits = await News.findOne({ email });

	if(exits) return res.status(400).send({ message: "Already subscribed!" });

	const saved = await News.create({ email });

	if(saved) return res.status(201).send({ message: "You have subscribed successfully" });
}