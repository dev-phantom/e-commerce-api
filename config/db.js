const { connect } = require("mongoose");

function connectDB(){
  return connect(process.env.MONGO_DB)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
}


module.exports = connectDB;
