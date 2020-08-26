const slack = require('slack');
const appId = process.env.APP_ID;
const version = process.env.VERSION;
const buildNumber = process.env.BUILD_NUM;
const envType = process.env.ENVTYPE;
const passed = process.env.IS_PASSED;
const platform = process.env.PLATFORM;
const TOKEN = process.env.SLACK_TOKEN;
let guid = 0;
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
      channel: '#white-label-builds',
      text: "BUILD COMPLETE! MORE POWER! HO HO HO.",
      attachments: [
          {
              "fallback": "Build " + appId + " passed with version " + version,
              "color": "#36a64f",
              "fields": [
                  {
                      "title": "Platform",
                      "value": platform,
                      "short": false
                  },
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
                      "title": "Environment",
                      "value": envType,
                      "short": false
                  }
              ],
              "footer": "Tim Taylor",
              "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
              "ts": 123456789
          }
      ],
      as_user: true,
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    slack.chat.postMessage({
      guid,
      token: TOKEN,
      channel: '#white-label-builds',
      text: "BUILD FAILED! UH OH!",
      attachments: [
          {
              "fallback": "Build " + appId + " failed with version " + version,
              "color": "#ff0000",
              "fields": [
                  {
                      "title": "Platform",
                      "value": platform,
                      "short": false
                  },
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
                      "title": "Environment",
                      "value": envType,
                      "short": false
                  }
              ],
              "footer": "Tim Taylor",
              "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
              "ts": 123456789
          }
      ],
      as_user: true,
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

post();