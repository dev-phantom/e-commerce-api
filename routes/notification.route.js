const { Router } = require("express");
const { createNotification,getAllNotifications } = require("../controllers/notification.controller");

const NotificationRouter = Router();

// add
NotificationRouter.post("/create",createNotification);


// get
NotificationRouter.get("/",getAllNotifications);

module.exports = NotificationRouter; 
