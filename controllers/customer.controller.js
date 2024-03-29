const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const client = require("../config/redis");
const Forget = require("../models/Forget");

// @Dec: Create account
// @Access: Public
// @Method: POST
module.exports.createAccount = async (req, res, next) => {
  try {
    const { first_name, last_name,phone_number, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({ message: "Credentials are required!" });
    }

    // first check if email does not exit
    const check = await Customer.findOne({ email });
    if (check)
      return res.status(401).send({ message: "Account with this email has already exit" });

    // hashed password
    const hashPassword = await bcrypt.hash(password, 13);

    await Customer.create({
      first_name,
      last_name,
      phone_number,
      email,
      password: hashPassword,
    })
      .then((data) => res.status(201).send({ data }))
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    next(error);
  }
};

// @Dec: Login
// @Access: Private
// @Method: POST

module.exports.loginUser = async (req, res, next) => {
  try {
    // validation

    const { email, password: pass } = req.body;

    if (!email || !pass)
      return res.status(400).send({ message: "Email or Password is required" });

    // check if user exit
    const userCheck = await Customer.findOne({ email });
    if (userCheck) {
      const verifyPassword = await bcrypt.compare(pass, userCheck.password);
      if (verifyPassword) {
        const { password, createdAt, updatedAt, ...others } = userCheck._doc;
        return res.status(200).send({ user: others });
      } else {
        return res.status(401).send({ message: "Invalid Email or password is invalid" });
      }
    } else {
      return res.status(401).send({ message: "Invalid Email or password is invalid" });
    }
  } catch (error) {
    next(error);
  }
};

// get all customers/users
module.exports.getAllCustomers = async (req,res,next) => {
  try{
    const customers = await Customer.find();
    return res.status(200).send({ customers });

  } catch(error){
    next(error);
  }
}

// get single customer/user
module.exports.getSingleCustomer = async (req,res,next) => {

  try{
    let { id } = req.params
    const customer = await Customer.findById({_id: id});
    return res.status(200).send({ customer });

  } catch(error){
    next(error);
  }
}

// update profile
module.exports.updateProfile = async (req,res,next) => {
  try{
    const { id } = req.body;
    const customer = await Customer.findById(id);

    if(customer){

      customer.first_name = req.body.fname;
      customer.last_name = req.body.lname;

      const saved = await customer.save();

      if(saved){
        const { password, createdAt, updatedAt, ...others } = customer._doc;
        return res.status(200).send(others)
      } else {
        return res.status(400).send({ message: "An error occured please try again later" });
      }

    } else {
      return res.status(404).send({ message: "Customer not found!" });
    }

  } catch(error){
    next(error);
  }
}

// Delete customer
// @Access: Private
// @Method: DELETE
module.exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the customer exists
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).send({ message: "Customer not found!" });
    }

    // Delete the customer
    await Customer.findByIdAndDelete(id);

    return res.status(200).send({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// forget password 
module.exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if(!email) return res.status(400).send({ message: "All Fields Are Required!" });

    // check if email does not exits
    const exitMail = await Customer.findOne({ email });
    if(!exitMail) return res.status(404).send({ message: "Email Not Found, Please Verify Your Email And Try Again" });

   // send mail
   const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD
       },
    });

   // generate OTP
   const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });

   // await client.connect();

   // await client.set(`${exitMail._id}`, `${otp}`);

   await Forget.create({
    user_id: exitMail._id,
    otp,
   });

   const info = await transporter.sendMail({
    from: '"Admin" <farm2home.com.ng>',
    to: `${exitMail.email}`, 
    subject: "Confirmation code ✔",
    text: `Your verification code is: ${otp}`,
  });

  if(info.messageId){
    return res.status(200).send(true);
  } else {
    return res.status(400).send({ message: "An error occurred!" });
  }

  } catch (error) {
    next(error);
  }
};
// verify code
module.exports.verifyCode = async (req,res,next) => {
  try {
    const { email,code } = req.body;

    if(!email || !code) return res.status(422).send({ message: "All Fields Are Required!" });

    // find user by email

    const user = await Customer.findOne({ email });
    if(!user) return res.status(404).send({ message: "No account Found with this emaill!" });

   // const value = await client.get(`${user._id}`);
    const value = await Forget.findOne({ user_id: user._id});

    console.log(value);

   if(value.otp === code){
    // await client.del(`${user._id}`);
    await Forget.findOneAndDelete({ user_id: user._id});
    return res.status(200).send(true);
   } else {
    return res.status(400).send({ message: "Invalid code!" });
   }

  } catch (error) {
    next(error);
  }
}
// update user password
module.exports.updateUserPassword = async (req,res,next) => {
  try {
    const { email,password } = req.body;


    if(!email || !password) return res.status(422).send({ message: "All Fields Are Required!" });

    // find user by email
    const user = await Customer.findOne({ email });
    if(!user) return res.status(404).send({ message: "No account Found with this emaill!" });

    // hashed password
    const hashPassword = await bcrypt.hash(password,13);

    // update password
    user.password = hashPassword;
    const saved = await user.save();

    if(saved){
      return res.status(200).send(true);
    } else {
      return res.status(400).send({ message: "Unable to update your password." });
    }


  } catch (error) {
    next(error);
  }
}
 module.exports.getCustomerCountByMonth = async(req, res, next) => {
  try {
    const customers = await Customer.find();
    const customerCountByMonth = {};

    customers.forEach((customer) => {
      const date = new Date(customer.createdAt);
      const month = date.toLocaleString('default', { month: 'short' }); // Get month name abbreviation

      if (!customerCountByMonth[month]) {
        customerCountByMonth[month] = 1;
      } else {
        customerCountByMonth[month]++;
      }
    });

    res.status(200).json({ customerCountByMonth });
  } catch (error) {
    res.status(500).json({ error: "Error calculating total customers by month" });
  }
}
