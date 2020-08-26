import React from 'react';
import { withTheme } from 'react-native-paper';
import Article from '@organisms/Article';

function ArticleScreen(props) {
  const { route } = props;
  React.useEffect(() => {}, []);
  return (
    <Article articleUrl={route.params.url} storyuuid={route.params.storyuuid} />
  );
}

ArticleScreen.navigationOptions = {
  header: null
};

export default withTheme(ArticleScreen);
