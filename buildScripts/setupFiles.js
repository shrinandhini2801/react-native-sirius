//import { ENVIRONMENT } from '../react/configs/apiConfig';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const platform = process.env.PLATFORM;
const appIdParam = process.env.APP_ID;
const env = process.env.ENVTYPE;

console.log('ENV CHECK', env);

let idMappingsRaw = fs.readFileSync('idMappings.json');
let idMappings = JSON.parse(idMappingsRaw);
console.log(idMappings);
const originalAppId =
  platform === 'ios'
    ? idMappings[appIdParam].ios
    : idMappings[appIdParam].android;
const appPath = originalAppId.split('.').join('/');

const fileName =
  platform === 'ios' ? 'bundleIdLocations' : 'androidNameLocations';
let filesToChangeJson = fs.readFileSync(fileName + '.json');
let filesToChange = JSON.parse(filesToChangeJson);

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}
const nameMappings = require('./nameMappings.json');

exec('ls -la .', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(`err: ${err}`);
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

if (platform == 'android') {
  if (!fs.existsSync('../android/app/src/main/java/' + appPath + '/')) {
    mkDirByPathSync('../android/app/src/main/java/' + appPath + '/');
  }
  if (!fs.existsSync('../android/app/src/androidTest/java/' + appPath + '/')) {
    mkDirByPathSync('../android/app/src/androidTest/java/' + appPath + '/');
  }

  fs.renameSync(
    '../android/app/src/main/java/com/sirius/MainActivity.java',
    '../android/app/src/main/java/' + appPath + '/MainActivity.java'
  );

  fs.renameSync(
    '../android/app/src/main/java/com/sirius/MainApplication.java',
    '../android/app/src/main/java/' + appPath + '/MainApplication.java'
  );

  // fs.renameSync('../android/app/src/androidTest/java/com/sirius/DetoxTest.java',
  // '../android/app/src/androidTest/java/' +appPath +'/DetoxTest.java');

  fs.renameSync(
    '../android/app/src/main/java/com/sirius/BridgePackage.java',
    '../android/app/src/main/java/' + appPath + '/BridgePackage.java'
  );

  fs.renameSync(
    '../android/app/src/main/java/com/sirius/WebViewManager.java',
    '../android/app/src/main/java/' + appPath + '/WebViewManager.java'
  );

  fs.renameSync(
    '../android/app/src/main/java/com/sirius/UtilityBridge.java',
    '../android/app/src/main/java/' + appPath + '/UtilityBridge.java'
  );
  fs.renameSync(
    '../android/app/src/main/java/com/sirius/ParselyBridge.java',
    '../android/app/src/main/java/' + appPath + '/ParselyBridge.java'
  );
}
filesToChange.files.forEach(file => {
  //Get file input
  if (file.rename) {
    file.name = file.name.replace('com/sirius', appPath);
  }
  let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(file.name)
  });
  //read each line
  lineReader.on('line', function(line) {
    if (line.trim().match(file.regex)) {
      let appId = '';
      //Replace left/right parentheses in regex (remove square brackets)
      const newStringRemovedLeftBracket = file.regex.split('[(]').join('(');
      let newStringRemovedRightBracket = newStringRemovedLeftBracket
        .split('[)]')
        .join(')');
      if (file.teamId) {
        appId = idMappings[appIdParam].devTeam;
      } else if (file.mapping) {
        if (file.mapping === 'parsely') {
          appId =
            env === 'prod'
              ? nameMappings[file.mapping].prod
              : nameMappings[file.mapping].dev;
        } else {
          appId = nameMappings[file.mapping];
        }
        if (file.replace) {
          newStringRemovedRightBracket = file.replace;
        }
      } else if (file.prefix) {
        appId = file.prefix + originalAppId;
      } else if (file.useAppId) {
        appId = appIdParam;
      } else if (file.useAppName) {
        appId = idMappings[appIdParam].appName;
      } else {
        appId = originalAppId;
      }
      //Insert actual string
      let removeComString = newStringRemovedRightBracket.replace('com.', '');
      let s = removeComString.replace('replace.appId', appId);
      let newString = s.replace('*.+', appId);
      let replaceTeamString = newString.replace('replace.team', appId);
      let finalString = replaceTeamString.replace('replace.this', appId);

      let fileToChange = fs.readFileSync(file.name).toString();
      let result = fileToChange.replace(line.trim(), finalString);
      fs.writeFileSync(file.name, result, 'utf8');
    }
  });
});
