const { exec } = require('child_process');

const BUCKET = 'misc.thestar.com';
const appId = process.env.APP_ID;
const provFileName = appId + '.mobileprovision';
const provPath = 'mobile/whitelabel/' + appId + '/';
const getProvFileCommand = 's3://' + BUCKET + '/' + provPath + provFileName + ' ' + './';

runCommand(getProvFileCommand, 'cp');

function runCommand(command, type){
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
