const { Router } = require("express");
const { sendMessage } = require("../controllers/contact.controller");

const contactRouter = Router();

contactRouter.post("/contact",sendMessage);

module.exports = contactRouter;