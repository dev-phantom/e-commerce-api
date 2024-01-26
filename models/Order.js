const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	customer_id: { type: String },
	amount_paid: { type: Number },
	products: { type: Array },
	address: { type: Object },
	status: { type: String, default: "Processing" },
	orderID: { type: String,trim: true },
},{ timestamps: true });


const order = mongoose.model("Order", OrderSchema);

module.exports = order;
