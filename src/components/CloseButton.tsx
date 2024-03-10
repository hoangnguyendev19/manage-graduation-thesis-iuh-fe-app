import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../themes/Colors';
import { responsiveWidth } from '../utils/sizeScreen';

interface Props {
  onPress: any;
  style: any;
}

const CloseButton = ({ onPress, style }: Props) => {
  return (
    <Ionicons
      name="close"
      style={[
        styles.container,
        {
          top: 30,
        },
        style,
      ]}
      size={30}
      onPress={() => {
        !!onPress && onPress();
      }}
    />
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: responsiveWidth(20),
    zIndex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  icon: { width: responsiveWidth(14), height: responsiveWidth(14) },
});
