const { Router } = require("express");
const { addOrder, updateOrderStatus, getAllOrders, getOrdersByOrderId } = require("../controllers/order.controller");

const OrderRouter = Router();

// Create a new order
OrderRouter.post("/", addOrder);

// Get orders for a specific customer
OrderRouter.get("/:orderID", getOrdersByOrderId);

// Get all orders
OrderRouter.get("/", getAllOrders);

// Update order status
OrderRouter.put("/update", updateOrderStatus);

module.exports = OrderRouter;
