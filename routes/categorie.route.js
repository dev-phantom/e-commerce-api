const { Router } = require("express");
const {
  addCategorie,
  getCategorie,
  removeCategorie,
  getByQuery
} = require("../controllers/categorie.controller");

const CategorieRouter = Router();

// add categorie
CategorieRouter.post("/add", addCategorie);

// get all categories
CategorieRouter.get("/get", getCategorie);

//fetch product by category
CategorieRouter.get("/q", getByQuery);

// delete categorie
CategorieRouter.delete("/delete", removeCategorie);

module.exports = CategorieRouter;
