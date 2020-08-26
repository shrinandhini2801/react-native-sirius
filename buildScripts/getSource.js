const { exec } = require('child_process');

const BUCKET = 'misc.thestar.com';
const appId = process.env.APP_ID;
const version = process.env.VERSION;
const buildNo = process.env.BUILD_NUM;
const sourcePath = 'mobile/whitelabel/builds/' + appId + '/' + version + '/' + buildNo + '/';
const getSourceCommand = 's3://' + BUCKET + '/' + sourcePath + ' ./GeneratedBuild';

runCommand(getSourceCommand, 'sync');

function runCommand(command, type){
    console.log("aws s3 " + type + " " + command);
    exec("aws s3 " + type + " " + command, {maxBuffer: 1024 * 5000}, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(`err: ${err}`);
      }
    
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
