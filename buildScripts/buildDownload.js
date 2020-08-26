const { exec } = require('child_process');

const BUCKET = 'misc.thestar.com';
const appId = process.env.APP_ID;
const version = process.env.VERSION;
const buildNo = process.env.BUILD_NUM;
const buildPath = 'mobile/whitelabel/builds/' + appId + '/' + version + '/' + buildNo + '/ios';
const getProvFileCommand = 's3://' + BUCKET + '/' + buildPath + ' ' + './ios_build';

console.log('AWS_SHARED_CREDENTIALS_FILE!!!', process.env.AWS_SHARED_CREDENTIALS_FILE)

runCommand(getProvFileCommand, 'sync');


const appFilePath = buildPath + ('/fastlane/Appfile');
const getAppFileCommand = 's3://' + BUCKET + '/' + appFilePath + ' ./ios/fastlane/Appfile';
runCommand(getAppFileCommand, 'cp');

function runCommand(command, type) {
  console.log("aws s3 " + type + " " + command);
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
