require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const CustomerRouter = require("./routes/customer.route");
const productRouter = require("./routes/product.router");
const CartRouter = require("./routes/cart.route");
const CategorieRouter = require("./routes/categorie.route");

const app = express();

// connect to DB
require("./config/db");

// middlewares
app.use(express.static(path.join(__dirname,"public")));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/", CustomerRouter);
app.use("/product", productRouter);
app.use("/cart", CartRouter);
app.use("/cartegorie", CategorieRouter);

// page not found
app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

app.listen(PORT, () => console.log("Server running on port...", PORT));
