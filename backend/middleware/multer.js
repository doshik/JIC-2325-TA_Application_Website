const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'minio', // From docker-compose file
    secretAccessKey: 'minio123', // From docker-compose file
    endpoint: 'http://localhost:9000', // From docker-compose file
    s3ForcePathStyle: true, // Required when using a local S3 server like Minio
    signatureVersion: 'v4' // Use the same version signed URLs
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'name-of-your-bucket', // Replace with your bucket name
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

module.exports = upload;
