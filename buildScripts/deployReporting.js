const slack = require('slack');
const appId = process.env.APP_ID;
const version = process.env.VERSION;
const buildNumber = process.env.BUILD_NUM;
const passed = process.env.IS_PASSED;
// const platform = process.env.PLATFORM;
const TOKEN = process.env.SLACK_TOKEN;
let guid = 0;

const appBuildsPath = "https://s3.amazonaws.com/misc.thestar.com/mobile/whitelabel/builds/"
const ipaPath = "/ios/build/" + appId + ".ipa"
/**
 * Post a new message to a channel/DM, depending
 * on where the source came from
 * 
 * @param {*} source - The source message that causes this post
 * @param {*} message - The message to send to the source channel
 */
function post() {
  console.log('SENDING POST...');
  guid++;

  if(passed == "true") {
    slack.chat.postMessage({
      guid,
      token: TOKEN,
      channel: '#white-label-deploys',
      text: "App successfully deployed to App Store!",
      attachments: [
          {
              "color": "#36a64f",
              "fields": [
                  {
                      "title": "App Id",
                      "value": appId,
                      "short": false
                  },
                  {
                      "title": "Version",
                      "value": version,
                      "short": false
                  },
                  {
                      "title": "Build Number",
                      "value": buildNumber,
                      "short": false
                  },
                  {
                      "title": "IPA",
                      "value": appBuildsPath + appId  + "/" + version + "/" + buildNumber + ipaPath,
                      "short": false
                  },
                  {
                      "title": "Git Branch",
                      "value": "origin/master",
                      "short": false
                  }
              ]
          }
      ]
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    slack.chat.postMessage({
      guid,
      token: TOKEN,
      channel: '#white-label-deploys',
      text: "DEPLOYMENT FAILED! UH OH!",
      attachments: [
          {
              "fallback": "Deployment of " + appId + " failed with version " + version,
              "color": "#ff0000",
              "fields": [
                  // {
                  //     "title": "Platform",
                  //     "value": platform,
                  //     "short": false
                  // },
                  {
                      "title": "App Id",
                      "value": appId,
                      "short": false
                  },
                  {
                      "title": "Version",
                      "value": version,
                      "short": false
                  },
                  {
                      "title": "Build Number",
                      "value": buildNumber,
                      "short": false
                  }
              ],
              "footer": "Tim Taylor",
              "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
              "ts": 123456789
          }
      ]
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

post();