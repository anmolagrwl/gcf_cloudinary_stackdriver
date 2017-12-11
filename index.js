/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: '<YOUR-CLOUD-NAME>',
  api_key: '<YOUR-API-KEY>',
  api_secret: '<YOUR-API-SECRET>'
});


exports.uploadImage = function (req, res){
  let file = req.body.file;
  let fileName = req.body.filename;

  console.log(`Uploading image file - ${fileName}`);

  uploadToCloudinary(file, fileName).then((results) => {
    let succ_msg = `Image file ${fileName} successfully uploaded`;
    console.log(succ_msg);
    res.send({
        "message": succ_msg,
        "data": results
    });
  }).catch((err) => {
    throw err_msg;
  })
}

let uploadToCloudinary = (file, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file)
    .then((result) => {
      resolve(result);
    }).catch((err) => {
      console.error(`Error in uploading image ${fileName} - ${err}`);
      reject(err)
    });
  })
}