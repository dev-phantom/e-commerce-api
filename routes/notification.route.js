const { Router } = require("express");
const { createNotification } = require("../controllers/notification.controller");

const NotificationRouter = Router();

// add
NotificationRouter.post("/create",createNotification);


module.exports = NotificationRouter; 