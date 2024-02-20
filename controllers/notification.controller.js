const Notification = require("../models/Notification");

module.exports.createNotification = async (req,res,next) => {
	try{
		const { id, message } = req.body;
		const saved = await Notification.create({ customer_id: id, message });

		if(saved) return res.status(201).send({ message: "Added!" });
		else return res.status(400).send({ message: "Error" });
	} catch(e){
		next(e);
	}
}

module.exports.getAllNotifications = async (req,res,next) => {
  try{
	  const noti = await Notification.find();
	  return res.status(200).send(noti);
	} catch(e){
		next(e);
	}
}
