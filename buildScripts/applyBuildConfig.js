const fs = require('fs');
const json = require('../build.config.json');
readBuildConfig(json);

function readBuildConfig(obj) {
  // Go through each object property
  let replaceablesArray_infoplist = [];
  let replaceablesArray_strings = [];
  Object.keys(obj).forEach(function(key, index) {
    switch (key) {
      case 'iOS':
        readBuildConfig(obj[key]);
        break;
      case 'android':
        readBuildConfig(obj[key]);
        break;
      case 'displayName': {
        const file1 = {
          name: 'ios/Sirius/Info.plist',
          regex: '@CFBundleDisplayName'
        };
        replaceablesArray_infoplist.push({ file: file1, val: obj[key] });
        const file2 = {
          name: 'android/app/src/main/res/values/strings.xml',
          regex: '<string name="app_name">*.+</string>'
        };
        replaceablesArray_strings.push({ file: file2, val: obj[key] });
        break;
      }
      case 'deep_url': {
        const file1 = {
          name: 'ios/Sirius/Info.plist',
          regex: '@CFBundleURLName'
        };
        replaceablesArray_infoplist.push({ file: file1, val: obj[key] });

        const file2 = {
          name: 'android/app/src/main/res/values/strings.xml',
          regex: '<string name="url_scheme_name">*.+</string>'
        };
        replaceablesArray_strings.push({ file: file2, val: obj[key] });

        const file3 = {
          name: 'ios/Sirius/Info.plist',
          regex: '@CFBundleURLSchemes'
        };
        replaceablesArray_infoplist.push({ file: file3, val: obj[key] });
        break;
      }
    }
    if (replaceablesArray_infoplist.length > 0) {
      readAndReplaceMultiple(replaceablesArray_infoplist);
    }
    if (replaceablesArray_strings.length > 0) {
      readAndReplaceMultiple(replaceablesArray_strings);
    }
  });
}

// Read a file and replace multiple values
function readAndReplaceMultiple(arr) {
  let filename = arr[0].file.name;
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    for (let i = 0; i < arr.length; i++) {
      const matchedString = data.match(arr[i].file.regex);
      if (matchedString) {
        const line = matchedString[0];
        let newLine;

        // If the regex is the actual value that needs to be replaced
        if (line.indexOf(arr[i].file.regex) !== -1) {
          newLine = arr[i].val;
        } else {
          //Replace left/right parentheses in regex (remove square brackets)
          const newStringRemovedLeftBracket = arr[i].file.regex.replace(
            '[(]',
            '('
          );
          const newStringRemovedRightBracket = newStringRemovedLeftBracket.replace(
            '[)]',
            ')'
          );
          newLine = newStringRemovedRightBracket.replace('*.+', arr[i].val);
        }
        data = data.replace(line, newLine);
      }
    }
    fs.writeFile(filename, data, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
}

// Read a file and replace a specific value
function readAndReplace(file, value) {
  fs.readFile(file.name, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    const matchedString = data.match(file.regex);
    if (matchedString) {
      const line = matchedString[0];
      let newLine;

      // If the regex is the actual value that needs to be replaced
      if (line.indexOf(file.regex) !== -1) {
        newLine = value;
      } else {
        //Replace left/right parentheses in regex (remove square brackets)
        const newStringRemovedLeftBracket = file.regex.replace('[(]', '(');
        const newStringRemovedRightBracket = newStringRemovedLeftBracket.replace(
          '[)]',
          ')'
        );
        newLine = newStringRemovedRightBracket.replace('*.+', value);
      }

      const result = data.replace(line, newLine);

      fs.writeFile(file.name, result, 'utf8', function(err) {
        if (err) return console.log(err);
      });
    }
  });
}
