const { Router } = require("express");
const {
  getAllProduct,
  addProduct,
  getSingleProduct,
  removeProduct,
  updateProduct
} = require("../controllers/product.controller");
// const { upload } = require("../middleware/uploads");

const productRouter = Router();

// Get all products
productRouter.get("/", getAllProduct);

// Get Single product
productRouter.get("/get/:id", getSingleProduct);

// Add product
productRouter.post("/add", addProduct);

// remove product
productRouter.delete("/remove", removeProduct);

// update product
productRouter.put("/update", updateProduct);

module.exports = productRouter;
