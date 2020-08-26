pipeline {
  agent {
      label 'MacMiniSlave'
  }

  environment {
    CI = 'true'
    EXPORT_AWS = 'npm run export-aws'
    EXPORT_APP = "export APP_ID=${params.appId} && \
                  export VERSION=${params.version} && \
                  export ENVTYPE=${params.envType}"
    EXPORT_BUILD_NUM = "export BUILD_NUM=\$(cd buildScripts && node changeVersions.js && cd ..)"
    EXPORT_APP_WITH_MISC = "${EXPORT_AWS} && \
                            ${EXPORT_APP} && \
                            ${EXPORT_BUILD_NUM}"
    REPORT = "npm install slack && \
              npm run report-build"
    REPORT_SUCCESS = "export IS_PASSED=true && \
                      ${REPORT}"
  }

  parameters {
    string(name: 'appId', defaultValue: 'whitelabel.dev', description: 'TorStar mobile app id (Ask NightKing)')
    string(name: 'version', defaultValue: '0', description: 'TorStar mobile app version number (Ask NightKing)')
    string(name: 'envType', defaultValue: 'dev', description: 'TorStar mobile environment (dev or prod) (Ask NightKing)')
  }

  stages {
    stage ('NPM Install'){
      steps {
        sh 'rm -fr node_modules'
        sh 'rm -rf $TMPDIR/metro-cache/ && npm cache clean --force'
        sh 'npm install'
      }
    }

    stage ('Synchronize ios/Android Assets') {
      steps {
        sh "echo ${params.appId}"
        sh "ls ."
        sh "${EXPORT_AWS} && \
        ${EXPORT_APP} && \
        npm run get-assets && \
        export PLATFORM=ios && \
        npm run setup-files && \
        npm run apply-build-config && \
        export PLATFORM=android && \
        npm run setup-files && \
        sleep 5"
      }
    }

    stage ('Build Android') {
      steps{
        sh "${EXPORT_APP_WITH_MISC} && \
        ls . && \
        npm run build-android ${params.envType} && \
        export PLATFORM=Android && \
        ${REPORT_SUCCESS}"
      }
    }

    stage ('Build iOS'){
      steps{
        sh "${EXPORT_APP_WITH_MISC} && \
        npm run build-sign-ios ${params.appId} ${params.envType} && \
        rm -rf node_modules/ && \
        rm -rf ios/Pods/ && \
        npm run upload-build && \
        export PLATFORM=iOS && \
        ${REPORT_SUCCESS}"
      }
    }
  }

  post {
    failure { 
      sh "${EXPORT_APP} && \
        export BUILD_NUM=\$(npm run get-latest-build-num) && \
        export IS_PASSED=false && \
        export PLATFORM=fixthis && \
        rm -rf node_modules/ && \
        npm run upload-build && \
        ${REPORT}"
    }
  }
}