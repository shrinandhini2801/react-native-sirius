const fs = require('fs');

let interval = setInterval(replaceFile, 1000);


function replaceFile() {
    let lineFound = false;
    let fileToChange = fs.readFileSync("./Sirius.xcodeproj/project.pbxproj").toString();
    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream("./Sirius.xcodeproj/project.pbxproj")
    });
    lineReader.on('line', function (line) {
        if (line.trim().indexOf("dev/null") > 0 && line.trim().indexOf("PODS_PODFILE_DIR_PATH") > 0) {
            lineFound = true;
            let newLine = line.replace('${PODS_PODFILE_DIR_PATH}', '${SRCROOT}')
            let finalLine = newLine.replace("${PODS_ROOT}", "${SRCROOT}/Pods")
            let result = fileToChange.replace(line, finalLine);
            try {
                fs.writeFileSync("./Sirius.xcodeproj/project.pbxproj", result, 'utf8');
            } catch (err) {
                // An error occurred
                console.error(err);
            }
        }
    }).on('close', function (line) {
        console.log("close")
        if (!lineFound) {
            console.log("done");
            clearInterval(interval);
        }
    });

}


