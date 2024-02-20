const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
	customer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Customer",
		required: true,
	},
	orderId: {
	    type: String,
	    ref: "Order",
	},
	full_name: {
	    type: String,
	    ref: "Order",
	},
	message: {
		type: String,
		trim: true,
	}
},{ timestamps: true });

const Notification = mongoose.model("Notification",NotificationSchema);

module.exports = Notification;
