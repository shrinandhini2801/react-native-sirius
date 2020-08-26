const { exec } = require('child_process');
const appId = process.env.APP_ID;
const version = process.env.VERSION;
const buildNumber = process.env.BUILD_NUM;
const isFailed = process.env.IS_PASSED;

const buildsFolder = isFailed ? 'failed_builds' : 'builds';

exec("aws s3 sync . s3://misc.thestar.com/mobile/whitelabel/" + buildsFolder + "/" + appId + "/" + version + "/" + buildNumber + "/" + " --exclude './ios/Pods/*'",{maxBuffer: 1024 * 8000}, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(`err: ${err}`);
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});