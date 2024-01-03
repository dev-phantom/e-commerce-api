const multer = require("multer");
const path = require("path");
const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("ruby-anxious-dolphinCyclicDB")

const products = db.collection("products")

async function upload(){
	// return multer({ dest: db.set("product",) })
}

module.exports = { upload, db };
