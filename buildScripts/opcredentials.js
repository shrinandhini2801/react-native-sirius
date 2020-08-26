const fs = require('fs');

const args = process.argv.slice(2);
const filePath = '/Users/jenkins/.oppw/cred'

fs.readFile(args[0], (err, data) => { 
    if (err) throw err;

    // console.log(data.toString());

    const json = JSON.parse(data);
    const field = args[1] || 'uid'

    // console.log(json.uid);
    console.log(json[field]);
    // console.log(json['pw']);
    // console.log(json['key']);
    // return json['uid']
});