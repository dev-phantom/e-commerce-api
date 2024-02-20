const { Router } = require("express");
const { getAllNotifications } = require("../controllers/notification.controller");

const NotificationRouter = Router();



// get
NotificationRouter.get("/",getAllNotifications);

module.exports = NotificationRouter; 
