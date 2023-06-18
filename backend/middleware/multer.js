const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// Configure the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  endpoint: process.env.MINIO_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

const bucketName = 'user-data';

// Check if the bucket exists, and create it if not
s3.headBucket({ Bucket: bucketName }, (err) => {
  if (err && err.code === 'NotFound') {
    s3.createBucket({ Bucket: bucketName }, (err, data) => {
      if (err) console.log("Error creating bucket:", err);
      else console.log("Bucket created:", data);
    });
  } else if (err) {
    console.log("Error checking bucket:", err);
  } else {
    console.log("Bucket exists");
  }
});

module.exports = s3;