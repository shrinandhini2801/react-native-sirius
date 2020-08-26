import React from 'react';
import { withTheme } from 'react-native-paper';
import ImageGallery from '@molecules/ImageGallery';

function GalleryScreen(props) {
  const { route } = props;
  return (
    <ImageGallery data={route.params.data} isMainart={route.params.isMainart} />
  );
}

GalleryScreen.navigationOptions = {
  header: null
};

export default withTheme(GalleryScreen);
