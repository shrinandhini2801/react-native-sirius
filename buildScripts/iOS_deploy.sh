export AWS_SHARED_CREDENTIALS_FILE=/Users/torstarbuildservers/.aws/credentials
export AWS_CONFIG_FILE=/Users/torstarbuildservers/.aws/config
export OP_USER=$(node ./buildScripts/opcredentials.js /Users/jenkins/.oppw/cred uid) && \
export OP_PASSWORD=$(node ./buildScripts/opcredentials.js /Users/jenkins/.oppw/cred pw) && \
export OP_KEY=$(node ./buildScripts/opcredentials.js /Users/jenkins/.oppw/cred key) && \
export OP_DOMAIN=$(node ./buildScripts/opcredentials.js /Users/jenkins/.oppw/cred domain) && \
export OP_SHORTHAND=$(node ./buildScripts/opcredentials.js /Users/jenkins/.oppw/cred shorthand) && \
echo $OP_USER
echo $OP_PASSWORD
echo $OP_KEY
echo $OP_DOMAIN
echo $OP_SHORTHAND
LOG_IN='/Users/jenkins/.op/op signin torstar.1password.com $OP_USER'
LOG_IN_SHORT="/Users/jenkins/.op/op signin torstar"
eval $(echo $OP_PASSWORD | $LOG_IN_SHORT)

export FASTLANE_USER_RAW=$(/Users/jenkins/.op/op get item AppleID | jq '.details.fields[] | select(.designation=="username").value') 
export FASTLANE_PASSWORD_RAW=$(/Users/jenkins/.op/op get item AppleID | jq '.details.fields[] | select(.designation=="password").value')
export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD_RAW=$(/Users/jenkins/.op/op get item AppleID | jq '.details.sections[0].fields[] | select(.t=="apppw").v')
export APP_ID=$1
export FASTLANE_USER=$(echo $FASTLANE_USER_RAW | sed -e 's/^"//' -e 's/"$//')
export FASTLANE_PASSWORD=$(echo $FASTLANE_PASSWORD_RAW | sed -e 's/^"//' -e 's/"$//')
export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=$(echo $FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD_RAW | sed -e 's/^"//' -e 's/"$//')
echo $FASTLANE_USER
echo $FASTLANE_PASSWORD
echo $FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD
echo $APP_ID
npm run deploy-ios
