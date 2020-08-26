import React from 'react';
import HalfCard from '@molecules/HalfCard';
import { View, StyleSheet } from 'react-native';
import RightAlignSquareImageCard from '@molecules/RightAlignSquareImageCard';
import { SIZES } from '@styles/sizes';
import { layout } from '@utils/Layout';

export const renderTabletBodyLayout = stories => {
  if (stories && stories.assets && stories.assets.length > 0) {
    let storyCount = stories.assets.length;
    if (storyCount === 2) {
      return (
        <View>
          <RightAlignSquareImageCard
            story={stories.assets[1]}
            key={stories.assets[1].asset.storyuuid}
          />
        </View>
      );
    } else if (storyCount === 3) {
      return (
        <View style={styles.row}>
          {stories.assets.map((story, index) => {
            return (
              index > 0 && (
                <RightAlignSquareImageCard
                  isHalf
                  story={story}
                  key={story.asset.storyuuid}
                />
              )
            );
          })}
        </View>
      );
    } else if (storyCount === 4 || storyCount === 5) {
      return (
        <View style={styles.row}>
          <HalfCard
            semiHalf
            story={stories.assets[1]}
            key={stories.assets[1].asset.storyuuid}
          />
          <View style={{ flex: 1 }}>
            {stories.assets.map((story, index) => {
              return (
                index > 1 && (
                  <RightAlignSquareImageCard
                    isTwoThird
                    story={story}
                    key={story.asset.storyuuid}
                  />
                )
              );
            })}
          </View>
        </View>
      );
    } else {
      const array1 = stories.assets.filter(
        (item, index) => index > 0 && index < 4
      );
      const array2 = stories.assets.filter((item, index) => index > 3);
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            {array1.map((story, index) => {
              return (
                <HalfCard semiHalf story={story} key={story.asset.storyuuid} />
              );
            })}
          </View>
          <View style={styles.halfCardWrapView}>
            {array2.map((story, index) => {
              return (
                <View style={styles.halfView}>
                  <RightAlignSquareImageCard
                    isHalf
                    story={story}
                    key={story.asset.storyuuid}
                  />
                </View>
              );
            })}
          </View>
        </View>
      );
    }
  } else {
    return false;
  }
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  noPadding: { paddingTop: 0 },
  extraMarginTop: {
    marginTop: SIZES.PADDING * 2
  },
  halfView: { width: layout.width / 2 },
  halfCardWrapView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.PADDING
  }
});
