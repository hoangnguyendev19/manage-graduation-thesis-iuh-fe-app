import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';
import { responsiveHeight, responsiveWidth } from '../utils/sizeScreen';
import IconView from './IconView';

interface Props {
  title?: string;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  textStyle?: any;
  wrapper?: string;
  nameIcon?: string;
  icon?: boolean;
}

const CustomButton: React.FC<Props> = ({ title, style, onPress, disabled, icon, nameIcon }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && { backgroundColor: Colors.grayLight }]}
      disabled={disabled}
      onPress={onPress}
    >
      {icon && (
        <IconView name={nameIcon ? nameIcon : 'sync-outline'} size={24} color={Colors.grayLight} />
      )}
      {title && <Text style={[styles.textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#38b000',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.grayLight,
    paddingHorizontal: responsiveWidth(3),
  },
});
