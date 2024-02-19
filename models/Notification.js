const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
	customer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Customer",
		required: true,
	},
	message: {
		type: String,
		trim: true,
	}
},{ timestamps: true });

const Notification = mongoose.model("Notification",NotificationSchema);

module.exports = Notification;