const { exec } = require('child_process');
const appId = process.env.APP_ID;
const env = process.env.ENVTYPE;
const host = 's3://misc.thestar.com/mobile/whitelabel/';

function runCommand(command, type) {
  exec("aws s3 " + type + " " + command, (err, stdout, stderr) => {
    err ? console.log(`err: ${err}`) : null;
    stdout ? console.log(`stdout: ${stdout}`) : null;
    stderr ? console.log(`stderr: ${stderr}`) : null;
  });
}

let syncCommand = host + appId + '/sync/ .';
runCommand(syncCommand, "sync");

if (env == 'prod') {
  let syncEnvCommand = host + appId + '/apiConfig.js ./react/configs/apiConfig.js';
  runCommand(syncEnvCommand, "cp");
}
else {
  let syncEnvCommand = host + appId + '/apiConfig-Dev.js ./react/configs/apiConfig.js';
  runCommand(syncEnvCommand, "cp");
}