const fs = require('fs');
const moment = require('moment');
const version = process.env.VERSION;

const filesToChangeJson = fs.readFileSync('versionCodeLocations.json');  
const filesToChange = JSON.parse(filesToChangeJson);  
let newBuildNum = '';

filesToChange.files.forEach(file => {

    fs.readFile(file.name, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        let isModified = false;
        let result = data;

        file.regex.forEach(regex => {
            const matchedString = data.match(regex);
            if(matchedString){
                const line = matchedString[0];
                const number = line.trim().match("[0-9]+\\.[0-9]+\\.[0-9]+|[0-9]+");
                let newLine = '';
    
                // Get version, change it, increment build number and change that too
                if(number[0].indexOf('.') == -1) { // Then it's a build number, increment
                  if (newBuildNum === '') {
                    newBuildNum = moment(new Date()).format('YYMMDDHHmm');
                    console.log(newBuildNum); // Need this to assign the env variable
                  }
                  newLine = line.replace(number[0], newBuildNum);
                  
                  
                } else { // it's a version code
                    newLine = line.replace(number[0], version);
                }
    
                result = result.replace(line, newLine);
                isModified = true;
            }
        });

        if (isModified) {
            fs.writeFile(file.name, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        }
        
    });
});
