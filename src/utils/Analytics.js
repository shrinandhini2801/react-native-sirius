import { ACPCore } from '@adobe/react-native-acpcore';
import { analytics } from '@rootConfig/build.config';
import { APP_INFO } from '@rootConfig/apiConfig';
import { Platform } from 'react-native';

export const trackState = () => {
  const stateData = {};
  stateData['torstar.AppVersion'] = APP_INFO.version;
  stateData['torstar.AppBuild'] = APP_INFO.buildNumber;
  stateData['torstar.TopLevelDomain'] = APP_INFO.topLevelDomain;
  stateData['torstar.SiteName'] = analytics.siteName;
  stateData['torstar.Mid'] = APP_INFO.mID;
  stateData['torstar.Breakpoint'] = APP_INFO.breakpoint;

  if (APP_INFO.trackState !== {}) {
    APP_INFO.trackState.pageName &&
      (stateData[
        'torstar.PageName'
      ] = APP_INFO.trackState.pageName.toLowerCase());
    APP_INFO.trackState.channel &&
      (stateData['torstar.Channel'] = APP_INFO.trackState.channel);
    APP_INFO.trackState.testOrHier &&
      (stateData['torstar.Hier'] = APP_INFO.trackState.testOrHier);
    APP_INFO.trackState.pageType &&
      (stateData['torstar.PageType'] = APP_INFO.trackState.pageType);
    APP_INFO.trackState.subPageType &&
      (stateData['torstar.SubPageType'] = APP_INFO.trackState.subPageType);
    APP_INFO.trackState.pageTitle &&
      (stateData['torstar.PageTitle'] = APP_INFO.trackState.pageTitle);
    APP_INFO.trackState.orientation &&
      (stateData['torstar.Orientation'] = APP_INFO.trackState.orientation);
    APP_INFO.trackState.pageURL &&
      (stateData['torstar.PageURL'] = APP_INFO.trackState.pageURL);
    APP_INFO.trackState.pageLocation &&
      (stateData['torstar.PageLocation'] = APP_INFO.trackState.pageLocation);
    APP_INFO.trackState.selectedCity &&
      (stateData['torstar.SelectedCity'] = APP_INFO.trackState.selectedCity);
    APP_INFO.trackState.contentHier &&
      (stateData['torstar.ContentHier'] = APP_INFO.trackState.contentHier);
    APP_INFO.trackState.pubDate &&
      (stateData['torstar.PubDate'] = APP_INFO.trackState.pubDate);
    APP_INFO.trackState.primaryPublication &&
      (stateData['torstar.PrimaryPublication'] = APP_INFO.trackState.primaryPublication);


    APP_INFO.trackState.authors &&
      (stateData['torstar.Authors'] = APP_INFO.trackState.authors.join("|"));
    APP_INFO.trackState.adId &&
      (stateData['torstar.AdId'] = APP_INFO.trackState.adId);
    APP_INFO.trackState.alias &&
      (stateData['torstar.alias'] = APP_INFO.trackState.alias);
    APP_INFO.trackState.storyUUID &&
      (stateData['torstar.storyUUID'] = APP_INFO.trackState.storyUUID);
    APP_INFO.trackState.sponsorName &&
      (stateData['torstar.SponsorName'] = APP_INFO.trackState.sponsorName);
    APP_INFO.trackState.credits &&
      (stateData['torstar.Credits'] = APP_INFO.trackState.credits.join("|"));
    APP_INFO.trackState['&&products'] &&
      (stateData['&&products'] = APP_INFO.trackState['&&products']);
    APP_INFO.trackState['&&pageName'] &&
      (stateData['&&pageName'] = APP_INFO.trackState['&&pageName']);

  }

  ACPCore.trackState(APP_INFO.trackState.pageName.toLowerCase(), stateData);
};

export const trackAction = () => {
  const actionData = {};
}
