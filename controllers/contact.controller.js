const Contact = require("../models/Contact");

async function sendMessage(req,res,next){
	try{
		const { fullname,email,message } = req.body;

		if(!fullname || !email || !message) return res.status(422).send({ message: "All fields are required!"});

		const saved = await Contact.create({
			fullname,email,message
		});

		if(saved) return res.status(200).send({ message: "Message sent!"});
		else return res.status(400).send({ message: "unable to send message!"});


	} catch(error){
		next(error);
	}
}


module.exports = { sendMessage };