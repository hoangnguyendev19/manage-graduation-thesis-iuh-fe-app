import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export function deviceWidth() {
  return width;
}

export function deviceHeight() {
  return height;
}

export function responsiveWidth(value = 0) {
  return (width * value) / width;
}

export function responsiveHeight(value = 0) {
  return (height * value) / height;
}

export function responsiveFont(value = 0) {
  return (width * value) / width;
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}
