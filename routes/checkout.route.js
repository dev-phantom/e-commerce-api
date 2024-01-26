const { Router } = require("express");

const { addressBook, addAdress } = require("../controllers/checkout.controller");

const checkOutRouter = Router();

// 1
checkOutRouter.post("/price", addAdress);


// 5
checkOutRouter.get("/address/:id", addressBook);


module.exports = checkOutRouter;
