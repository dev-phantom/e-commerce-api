require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const helmet = require("helmet");
const cors = require("cors");
const CustomerRouter = require("./routes/customer.route");
const productRouter = require("./routes/product.router");
const CartRouter = require("./routes/cart.route");
const CategorieRouter = require("./routes/categorie.route");
const PriceListRouter = require("./routes/pricelist.route");
const CheckOutRouter = require("./routes/checkout.route");
const OrderRouter = require("./routes/order.route");
const ContactRouter = require("./routes/contact.route");

const { rateLimit } = require("express-rate-limit")

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

// connect to DB 
const connectDB = require("./config/db");

// middlewares
// app.use(express.static(path.join(__dirname,"public")));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(limiter)
// routes

app.use("/", CustomerRouter);
app.use("/product", productRouter);
app.use("/cart", CartRouter);
app.use("/category", CategorieRouter);
app.use("/checkout", CheckOutRouter);
app.use("/order", OrderRouter);
app.use("/pricelist", PriceListRouter);
app.use("/contact", ContactRouter);

// page not found
app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

connectDB()
 .then(() => {
   app.listen(PORT, () => console.log("Server running on port...", PORT));
 })
 .catch(error => console.error(error))

