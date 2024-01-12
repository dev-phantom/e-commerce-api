const Product = require("../models/Product");
const Cart = require("../models/Cart");
const cloud = require("../config/cloud");
//const cloudinary = require("cloudinary").v2;

// @Des: Get all product
// @Method: GET
// @Access: Public
module.exports.getAllProduct = async (req, res, next) => {
  try {
    const { q } = req.query;
    if(q){
       const products = await Product.find({ product_cat: q }).sort({ createdAt: -1 });
       return res.status(200).send(products);
    } 
    const products = await Product.find().sort({ createdAt: -1 });
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
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).send({ product });
  } catch (error) {
    next(error);
  }
};

// @Des: Add product
// @Method: POST
// @Access: Private
module.exports.addProduct = async (req, res, next) => {
  try {
  
    const { product_name,product_des,product_price,product_cat,product_rate,product_image,product_total,alt_image } = req.body;
  
    if (!product_name || !product_des || !product_price || !product_cat || !product_rate) return res.status(400).send({ message: "Field are required!" });


    // upload image to cloudinary
    //const result = await cloudinary.uploader.upload(req.body.product_image)
        await Product.create({
            product_name,
            product_image,
            alt_image,
            product_des,
            product_price,
            product_cat,
            product_rate,
            product_total
        })
        .then((data) =>
          res.status(201).send({ data })
        )
        .catch((error) => console.log("1",error));
    
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
      .then((data) => res.status(200).send({ product: data._id }))
      .catch((error) =>
        res.status(400).send({ message: "An error occured please try again later" })
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
      .then((data) => res.status(200).send({ data }))
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    next(error);
  }
};
