require("dotenv").config();
const express = require("express");
const http = require("http"); // Require HTTP module
const socketIo = require("socket.io"); // Require socket.io module
const PORT = process.env.PORT || 3000;
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const CustomerRouter = require("./routes/customer.route");
const productRouter = require("./routes/product.router");
const CartRouter = require("./routes/cart.route");
const CategorieRouter = require("./routes/categorie.route");
const PriceListRouter = require("./routes/pricelist.route");
const CheckOutRouter = require("./routes/checkout.route");
const OrderRouter = require("./routes/order.route");
const ContactRouter = require("./routes/contact.route");
const NewsRouter = require("./routes/newsletter.route");
const NotificationRouter = require("./routes/notification.route");
const { getAllNotifications } = require("./controllers/notification.controller");
const { Server } = require('socket.io');


const app = express();
app.use(cors()); // Add cors middleware

const server = http.createServer(app); // Add this

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // We can write our socket event listeners in here...
  getAllNotifications(io);
});

// connect to DB 
const connectDB = require("./config/db");

// middlewares
app.use(express.static(path.join(__dirname,"public")));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", CustomerRouter);
app.use("/product", productRouter);
app.use("/cart", CartRouter);
app.use("/category", CategorieRouter);
app.use("/checkout", CheckOutRouter);
app.use("/order", OrderRouter);
app.use("/pricelist", PriceListRouter);
app.use("/contact", ContactRouter);
app.use("/news", NewsRouter);
app.use("/notification",NotificationRouter);

// page not found
app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

connectDB()
    .then(() => {
        server.listen(PORT, () => console.log("Server running on port...", PORT));
    })
    .catch(error => console.error(error))
