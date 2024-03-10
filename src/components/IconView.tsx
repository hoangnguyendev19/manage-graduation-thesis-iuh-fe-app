import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../themes/Colors';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const IconView = ({ name, size, color }: IconProps) => {
  return <Ionicons name={name} color={color || Colors.black} size={24 || size} />;
};

export default IconView;
