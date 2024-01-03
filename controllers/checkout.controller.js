const CheckOut = require("../models/CheckOut");
const PriceList = require("../models/PriceList");

async function returnPrice(req,res,next){
	const { first_name, last_name, email, phone_number, state, city, additional_phone_number,directions } = req.body;

	if(!first_name || !last_name || !email || !phone_number || !state || !city || !additional_phone_number){
		return res.status(422).send({ message: "All fields are required!" });
	}

	CheckOut.create({ first_name, last_name, email, phone_number, state, city, additional_phone_number,directions })
      .then(() => {
      	PriceList.findOne({ city })
      	  .then((data) => {
      	  	const { estimatePrice,...others } = data._doc;
      	  	res.status(200).send({ estimatePrice });
      	  })
      	  .catch(() => res.status(422).send({ message: "An error occured please try again later!" }))
      })
      .catch(() => res.status(400).send({ message: "An unknown error occured..." }))
}

module.exports = { returnPrice }