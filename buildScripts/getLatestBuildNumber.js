const AWS = require('aws-sdk');

const BUCKET = 'misc.thestar.com';
const appId = process.env.APP_ID;
const version = process.env.VERSION;
const appPath = 'mobile/whitelabel/builds/' + appId + '/' + version + '/';

// Set the region 
AWS.config = new AWS.Config();

// Create S3 service object
const s3 = new AWS.S3();

// Create the parameters for calling listObjects
const bucketParams = {
  Bucket : BUCKET,
  Prefix: appPath,
  Delimiter: '/'
};

// Figure out the newest build that's been created
s3.listObjects(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    newestBuild = 0;

    data.CommonPrefixes.forEach((directory) => {
      const parts = directory.Prefix.split('/');
      const buildInt = parseInt(parts[parts.length - 2], 10);
    
      if (buildInt > newestBuild) {
        newestBuild = buildInt;
      }
    });

    console.log(newestBuild); // Need this to assign to an env variable
  }
});


