import React from 'react';
import { View } from 'react-native';

import FastImage, { ResizeMode } from 'react-native-fast-image';

import { StyleSheet } from 'react-native';
import { Images } from '../assets/images/Images';
import Colors from '../themes/Colors';

type Props = {
  height?: number | string;
  width?: number | string;
  tintColor?: string;
  source: any;
};

const Logo = ({ height, width, tintColor, source }: Props) => {
  return (
    <View style={[styles.content]}>
      <FastImage
        source={source}
        style={[{ width: 200, height: 200 } || { height, width }]}
        resizeMode={'contain'}
        tintColor={tintColor || Colors.primary}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  content: {
    height: 200,
    width: 200,
  },
});
