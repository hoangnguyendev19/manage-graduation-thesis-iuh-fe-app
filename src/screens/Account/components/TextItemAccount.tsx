import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Line from '../../../components/Line';
import Colors from '../../../themes/Colors';

interface Props {
  textLeft?: string;
  textRight?: string;
  color?: string;
  line?: boolean;
  main?: boolean;
  children?: any;
}

const TextItemAccount: React.FC<Props> = ({ textLeft, textRight, line, main, children }) => {
  return (
    <View style={styles.container}>
      <View style={[main == true ? styles.contentLeft : styles.content]}>
        <View style={[main == true ? styles.leftTextMain : styles.left]}>
          <Text style={[styles.leftText]}>{textLeft} :</Text>
        </View>
        <View style={styles.right}>
          <Text numberOfLines={1} style={styles.rightText}>
            {textRight}
          </Text>
        </View>
      </View>
      {children}
      {line && (
        <View style={styles.line}>
          <Line></Line>
        </View>
      )}
    </View>
  );
};

export default TextItemAccount;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    paddingVertical: 5,
  },
  contentLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    paddingVertical: 5,
    marginLeft: 10,
  },
  leftText: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  rightText: {
    color: Colors.accountText,

    fontSize: 15,
  },
  left: {
    width: '30%',
  },
  right: {
    width: '70%',
  },
  container: {
    flexDirection: 'column',
  },
  line: {
    paddingVertical: 10,
  },
  leftTextMain: {
    width: '20%',
  },
});
