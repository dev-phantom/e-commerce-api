const { Router } = require("express");
const { subcribeNews } = require("../controllers/newsletter.controller");

const newsLetterRouter = Router();

// post
newsLetterRouter.post("/subscribe", subcribeNews);

module.exports = newsLetterRouter;