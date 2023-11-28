const cloudinary = require("cloudinary");
const cloud = async (value) => {
   await cloudinary.v2.uploader
        .upload(value, { overwrite: true, invalidate: true, resource_type: "auto" })
        .then((result) => {
        if (result && result?.secure_url) {
        console.log(result);
            return result?.secure_url;
        }
    })
        .catch((error) => error);
}
module.exports = cloud;