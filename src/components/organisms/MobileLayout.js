import React from 'react';
import HalfCard from '@molecules/HalfCard';
import { View, StyleSheet } from 'react-native';
import RightAlignSquareImageCard from '@molecules/RightAlignSquareImageCard';
import { SIZES } from '@styles/sizes';

export const displayHalfOrNot = section => {
  if (
    section.assets &&
    section.assets.length > 3 &&
    section.assets[1].asset.image.url.length > 2 &&
    section.assets[2].asset.image.url.length > 2
  ) {
    return true;
  } else {
    return false;
  }
};

export const renderMobileBodyLayout = stories => {
  if (stories && stories.assets && stories.assets.length > 0) {
    const arrayForMore = stories.assets.length > 3 && stories.assets.filter((item, index) => index > 2);
    return (
      <>
        {/* Second and third card (half and half on side) */}
        {displayHalfOrNot(stories) ? (
          <View style={styles.row}>
            <HalfCard
              story={stories.assets[1]}
              key={stories.assets[1].asset.storyuuid}
            />
            <HalfCard
              story={stories.assets[2]}
              key={stories.assets[2].asset.storyuuid}
            />
          </View>
        ) : (
            <View>
              {stories.assets.map((story, index) => {
                return index > 0 && (
                  <RightAlignSquareImageCard
                    story={story}
                    key={story.asset.storyuuid}
                  />
                );
              })}
            </View>
          )}

        {arrayForMore && arrayForMore.length > 0 &&
          arrayForMore.map(story => {
            return (
              <RightAlignSquareImageCard
                story={story}
                key={story.asset.storyuuid}
              />
            );
          })}
      </>
    );
  } else {
    return false;
  }
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  extraMarginTop: {
    marginTop: SIZES.PADDING * 2
  }
});
