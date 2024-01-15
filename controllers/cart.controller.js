const Cart = require("../models/Cart");

// @Des: Add to the customer cart
// @Access: Private
// @Method: POST
module.exports.addToCart = async (req, res, next) => {
  try {
    // get the user and the product ID
    const { product_id, customer_id } = req.body;

    if (!product_id || !customer_id)
      return res.status(400).send({ message: "Cusotmer or product ID is required" });
    
      // save to cart
      await Cart.create({
        product_id,
        customer_id,
      })
        .then(async (data) => {
          const result = await data.populate("product_id");
          return res
            .status(200)
            .send({ product: result });
        })
        .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleCart = async (req,res,next) => {
  try{

    const cart = await Cart.find({ customer_id: req.params.id }).populate("product_id");
    return res.status(200).send({ cart })
  } catch(error){
    next(error);
  }
}

// increamenet
module.exports.addToQuatity = async (req,res,next) => {
  try{
    const cart = await Cart.findById(req.body.id)

    if(cart){

      cart.product_quatity += 1;
      await cart.save();
      console.log(cart);
      return res.status(200).send({ cart: cart._id });

    } else {
      return res.status(404).send({ message: "Cart not found" });
    }

  } catch(error){
    next(error);
  }
}


// decreamenet
module.exports.minusToQuatity = async (req,res,next) => {
  try{
    const cart = await Cart.findById(req.body.id)

    if(cart){

      if(cart.product_quatity !== 1){
        //await Cart.findOneAndUpdate({ _id: cart._id },{ $set: { product_quatity: +product_quatity - 1 }},{ new: true })
        cart.product_quatity -= 1;
        await cart.save();
        return res.status(200).send(cart._id);
      } else {
        await Cart.findByIdAndDelete(cart._id).then((data) => {
          return res.status(200).send({ cart: data._id });
        }).catch(error => {
          return res.status(400).send({ message: "An error occured please try again later" });
        })
      }

    } else {
      return res.status(404).send({ message: "Cart not found" });
    }

  } catch(error){
    next(error);
  }
}



// delete cart
module.exports.deleteFromCart = async (req,res,next) => {
  try{
    const cart = await Cart.findById(req.body.id)

    if(cart){
       
       await Cart.findByIdAndDelete(cart._id).then((data) => {
          return res.status(200).send({ cart: data._id });
        }).catch(error => {
          return res.status(400).send({ message: "An error occured please try again later" });
        })
    
    
    } else {
      return res.status(404).send({ message: "Cart not found" });
    }

  } catch(error){
    next(error);
  }
}
