const { Router } = require("express");
const { addOrder, updateOrderStatus, getAllOrders, getOrdersByOrderId, getOrdersByCustomer, getTotalRevenue, getTotalProductsSold, getTotalRevenueByMonth,  } = require("../controllers/order.controller");

const OrderRouter = Router();

// Create a new order
OrderRouter.post("/", addOrder);

// Get orders for a specific customer
OrderRouter.get("/customer/:customer_id", getOrdersByCustomer);
// Get orders for a specific customer
OrderRouter.get("/:orderID", getOrdersByOrderId);

// Get all orders
OrderRouter.get("/", getAllOrders);

// Update order status
OrderRouter.put("/update", updateOrderStatus);

OrderRouter.get("/total/order", getTotalRevenue);

OrderRouter.get("/total/sold", getTotalProductsSold);

OrderRouter.get("/total/revenue-per-month", getTotalRevenueByMonth);

module.exports = OrderRouter;
