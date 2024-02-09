const Order = require("../models/Order");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const Product = require("../models/Product");

async function addOrder(req, res, next) {
  const { orderID, products, address, customer_id, amount_paid } = req.body;
  if (!address || !orderID || !customer_id || !products || !amount_paid) {
    return res.status(422).send({ message: "All fields are required!" });
  }

  try {
    // Create order with status
    const order = await Order.create({
      address,
      orderID,
      products,
      customer_id,
      amount_paid,
    });
    // Decrement product quantity
    for (const item of products) {
      const productId = item.product_id._id;
      const productQuantity = parseInt(item.product_quatity);
      // Fetch current product total
      const product = await Product.findById(productId);
      if (!product) {
        console.log(`Product with ID ${productId} not found.`);
      }
      // Calculate new product total
      const newProductTotal = product.product_total - productQuantity;

      // Update product total
      let  resp = await Product.findByIdAndUpdate(productId, {
        product_total: newProductTotal,
      });
      console.log(resp)
    }
    // Delete items from the cart
    await Cart.deleteMany({ customer_id });

    res.status(200).send({ order });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An unknown error occurred..." });
  }
}
async function getOrdersByCustomer(req, res, next) {
  const { customer_id } = req.params;

  try {
    const orders = await Order.find({ customer_id });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving orders for the customer." });
  }
}

async function getOrdersByOrderId(req, res, next) {
  const { orderID } = req.params;

  try {
    const orders = await Order.find({ orderID }).populate("customer_id");
    res.status(200).send(orders);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving orders for the customer." });
  }
}

async function updateOrderStatus(req, res, next) {
  const { orderID, status } = req.body;

  try {
    // Find and update order status
    const order = await Order.findOneAndUpdate(
      { orderID },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }

    res.status(200).send({ order });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An unknown error occurred..." });
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find().populate("customer_id");
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving all orders." });
  }
}
module.exports = {
  addOrder,
  getAllOrders,
  updateOrderStatus,
  getOrdersByOrderId,
  getOrdersByCustomer,
};
