const { Router } = require("express");
const {
  createAccount,
  loginUser,
  getAllCustomers,
  updateProfile,
  getMyProfile,
  getSingleCustomer,
  deleteCustomer,
  forgetPassword,
  verifyCode,
  updateUserPassword
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

// get single user
CustomerRouter.get("/customers/:id",getSingleCustomer);

// update profile
CustomerRouter.put("/update/profile", updateProfile);

// delete profile
CustomerRouter.delete("/customers/:id", deleteCustomer);

// forget password
CustomerRouter.post("/customers/forget", forgetPassword);

// verify otp
CustomerRouter.post("/customers/verify", verifyCode);

// update password
CustomerRouter.post("/customers/update", updateUserPassword);


module.exports = CustomerRouter;
