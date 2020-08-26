const { exec } = require('child_process');

const BUCKET = 'misc.thestar.com';
const appId = process.env.APP_ID;
const buildConfigFileName = 'build.config.json';
const configPath = 'mobile/whitelabel/' + appId + '/' + buildConfigFileName;
const getBuildConfigCommand = 's3://' + BUCKET + '/' + configPath + ' ' + buildConfigFileName;

runCommand(getBuildConfigCommand, 'cp');

function runCommand(command, type){
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

