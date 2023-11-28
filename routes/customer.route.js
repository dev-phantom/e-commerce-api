const { Router } = require("express");
const {
  createAccount,
  loginUser,
  getAllCustomers,
  updateProfile,
  getMyProfile
} = require("../controllers/customer.controller");

const CustomerRouter = Router();

// @Dec: create account
// @Method: POST
// @Access: Public
CustomerRouter.post("/create", createAccount);

// @Dec: Login user
// @Method: POST
// @Access: Private
CustomerRouter.post("/login", loginUser);

// get All users
CustomerRouter.get("/customers",getAllCustomers);

// update profile
CustomerRouter.put("/update/profile", updateProfile);

module.exports = CustomerRouter;
