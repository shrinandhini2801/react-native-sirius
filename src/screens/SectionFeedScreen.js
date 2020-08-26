import React, { useEffect } from 'react';
import { withTheme } from 'react-native-paper';
import NewsFeed from '@organisms/NewsFeed';

function SectionFeedScreen(props) {

  const { route } = props;
  const url = route.params.url;
  const isHome = route.params.isHome;
  useEffect(() => {
  }, []);
  return <NewsFeed isHome={isHome} path={url} fromSections />;
}

SectionFeedScreen.navigationOptions = {
  header: null
};

export default withTheme(SectionFeedScreen);
