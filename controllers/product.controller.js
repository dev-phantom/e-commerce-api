const Product = require("../models/Product");
const Cart = require("../models/Cart");

// @Des: Get all product
// @Method: GET
// @Access: Public
module.exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    return res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

// @Des: Get Single product
// @Method: GET
// @Access: Public
module.exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

// @Des: Add product
// @Method: POST
// @Access: Private
module.exports.addProduct = async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send("Field are required!");

    await Product.create({
      product_name: req.body.product_name,
      product_image: req.file.filename,
      product_des: req.body.product_des,
      product_price: req.body.product_price,
      product_cat: req.body.product_cat,
    })
      .then((data) =>
        res.status(201).send(data)
      )
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};

// @Des: Remove product
// @Method: DELETE
// @Access: Private
module.exports.removeProduct = async (req, res, next) => {
  try {
    // find product in the cart and delete it
    await Cart.find({ product_id: req.body.id}).deleteMany();
    // find the product by ID and delete
    await Product.findByIdAndDelete(req.body.id)
      .then((data) => res.status(200).send(data._id))
      .catch((error) =>
        res.status(400).send("An error occured please try again later")
      );
  } catch (error) {
    next(error);
  }
};

// @Des: Update product
// @Method: PUT
// @Access: Private
module.exports.updateProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.body.id, req.body, { new: true })
      .then((data) => res.status(200).send(data))
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};
