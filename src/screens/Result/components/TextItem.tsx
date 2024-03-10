import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { responsiveWidth } from '../../../utils/sizeScreen';

interface Props {
  textLeft?: string;
  textRight?: string;
  color?: string;
}
const TextItem: React.FC<Props> = ({ textLeft, textRight }) => {
  return (
    <>
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.subTitle}>{textLeft} :</Text>
        </View>
        <View style={styles.right}>
          <Text numberOfLines={1} style={styles.subTitle}>
            {textRight}
          </Text>
        </View>
      </View>
    </>
  );
};
export default TextItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  },
  subTitle: {
    paddingVertical: responsiveWidth(9),
    fontSize: 15,
  },
  left: {
    width: '30%',
  },
  right: {
    width: '70%',
  },
});
