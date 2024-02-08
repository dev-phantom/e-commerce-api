const { Router } = require("express");
const { subcribeNews, getAllNewsLetterSub } = require("../controllers/newsletter.controller");

const newsLetterRouter = Router();

// post
newsLetterRouter.post("/subscribe", subcribeNews);
newsLetterRouter.get("/", getAllNewsLetterSub);

module.exports = newsLetterRouter;