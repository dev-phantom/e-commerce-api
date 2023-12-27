const Categorie = require("../models/Categorie");

// @Des: Add Categorie
// @Method: POST
// @Access: Public
module.exports.addCategorie = async (req, res, next) => {
  try {
    if (req.body.cat) {
      await Categorie.create({
        name: req.body.cat
      })
        .then((data) => res.status(201).send({ data }))
        .catch((error) => res.status(400).send({ error }));
    } else {
      return;
    }
  } catch (error) {
    next(error);
  }
};

// @Des: Remove Categorie
// @Method: DELETE
// @Access: Public
module.exports.removeCategorie = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.body.id) {
      await Categorie.findByIdAndDelete(id)
        .then((data) => res.status(200).send({ data }))
        .catch((error) => res.status(400).send({ error }));
    } else {
      return;
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getByQuery = async (req,res,next) => {
    try{
      const { q } = req.query;
      const products = await Categorie.find({ product_cat: q });
      return res.status(200).send({ products });
    } catch(error) {
      next(error);
    }
}

// @Des: Get all categories
// @Method: GET
// @Access: Public
module.exports.getCategorie = async (req, res, next) => {
  try {
    await Categorie.find()
      .then((data) => res.status(200).send({ data }))
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    next(error);
  }
};
