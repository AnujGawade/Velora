const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dhrduukt7',
  api_key: '711648579623399',
  api_secret: 'H51rlUow1zzl1CvoUSLqbgQQjjU',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
