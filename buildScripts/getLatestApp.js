const AWS = require('aws-sdk');
const { exec } = require('child_process');

const BUCKET = 'misc.thestar.com';
const appId = process.env.APP_ID;
const platform = process.env.PLATFORM;
const getVersion = process.env.GET_VERSION;
const appPath = 'mobile/whitelabel/builds/' + appId + '/';

// Set the region 
AWS.config = new AWS.Config();

// Create S3 service object
const s3 = new AWS.S3();

// Create the parameters for calling listObjects
const bucketParams = {
  Bucket: BUCKET,
  Prefix: appPath,
  Delimiter: '/'
};

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function (err, data) {
  let newestBuild, newestVersionString;

  if (err) {
    console.log("Error", err);
  } else {
    let newestVersion = 0;
    newestVersionString = "";
    let newestDirectory = "";

    // Figure out the highest version that has
    // been created by iterating the directories
    // and comparing
    data.CommonPrefixes.forEach((directory) => {
      const parts = directory.Prefix.split('/');
      const version = parts[parts.length - 2];
      const versionInt = parseInt(version.split('.').join(''), 10);

      if (versionInt > newestVersion) {
        newestVersion = versionInt;
        newestVersionString = version;
        newestDirectory = directory;
      }
    })

    if (getVersion) {
      console.log(newestVersionString); // Need this to assign to an env variable
      return;
    }

    const bucketParams = {
      Bucket: BUCKET,
      Prefix: newestDirectory.Prefix,
      Delimiter: '/',
    };

    // Figure out the newest build that's been
    // created
    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        newestBuild = 0;

        data.CommonPrefixes.forEach((directory) => {
          const parts = directory.Prefix.split('/');
          const buildInt = parseInt(parts[parts.length - 2], 10);

          if (buildInt > newestBuild) {
            newestBuild = buildInt;
            console.log(buildInt)
          }
        });
      }

      // Download the latest APK/IPA
      const isiOS = platform === 'ios';
      const appFileName = isiOS ? 'Sirius.ipa' : 'app-release.apk';
      const appReleasePath = isiOS ? '/ios/build/' : '/android/app/build/outputs/apk/release/';
      const appFilePath = appPath + newestVersionString + '/' + newestBuild + appReleasePath + appFileName;
      const getAppCommand = 's3://' + BUCKET + '/' + appFilePath + ' ' + appFileName;
      runCommand(getAppCommand, 'cp');

      // Download the latest AndroidManifest.xml/Info.plist
      const infoFileName = isiOS ? 'Info.plist' : 'AndroidManifest.xml';
      const infoFilePath = appPath + newestVersionString + '/' + newestBuild + (isiOS ? '/ios/Sirius/' : '/android/app/src/main/') + infoFileName;
      const getInfoFileCommand = 's3://' + BUCKET + '/' + infoFilePath + ' ' + infoFileName;
      runCommand(getInfoFileCommand, 'cp');

      if (isiOS) {
        const appFilePath = appPath + newestVersionString + '/' + newestBuild + ('/ios/fastlane/Appfile');
        const getAppFileCommand = 's3://' + BUCKET + '/' + appFilePath + ' ./ios/fastlane/Appfile';
        runCommand(getAppFileCommand, 'cp');
      }
      else {
        const appFilePath = appPath + newestVersionString + '/' + newestBuild + ('/android/fastlane/Appfile');
        const getAppFileCommand = 's3://' + BUCKET + '/' + appFilePath + ' ./android/fastlane/Appfile';
        runCommand(getAppFileCommand, 'cp');
      }

      // Download the correct gp-key.json (android only)
      const jsonFileName = !isiOS ? 'gp-key.json' : null;
      if (jsonFileName) {
        const jsonFilePath = appPath + newestVersionString + '/' + newestBuild + ('/android/fastlane/keys/') + jsonFileName;
        const getJsonFileCommand = 's3://' + BUCKET + '/' + jsonFilePath + ' ./android/fastlane/keys/' + jsonFileName;
        runCommand(getJsonFileCommand, 'cp');
      }
    })
  }
});

function runCommand(command, type) {
  exec("aws s3 " + type + " " + command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(`err: ${err}`);
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}


