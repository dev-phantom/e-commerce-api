const Notification = require("../models/Notification");

module.exports.getAllNotifications = async (io) => {
    try {
        const notifications = await Notification.find();
        io.emit("notification", notifications); // Emit notifications to all connected clients
    } catch (error) {
        console.error("Error emitting notifications:", error);
        throw error; // Propagate the error to the caller
    }
};