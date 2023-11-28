const { Router } = require("express");
const {
  addCategorie,
  getCategorie,
  removeCategorie,
} = require("../controllers/categorie.controller");

const CategorieRouter = Router();

// add categorie
CategorieRouter.post("/add", addCategorie);

// get all categories
CategorieRouter.get("/get", getCategorie);

// delete categorie
CategorieRouter.delete("/delete", removeCategorie);

module.exports = CategorieRouter;
