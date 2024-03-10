import { useState } from 'react';

import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../utils/sizeScreen';

interface Props {
  key?: number | string;
  value?: string | [];
  onChangeText(text: any): any;
  title?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  refs?: string | undefined;
  autoFocus?: boolean;
  messageError?: boolean;
  isRequire?: boolean;
  pointerEvents?: boolean;
  leftIcon?: boolean;
  onPress?: () => void;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
  onEndEditing?: () => void;
  onFocus?: () => void;
  maxLength?: number;
  placeholderTextColor?: string;
  keyboardType?: any;
  editable?: boolean;
  scrollEnabled?: boolean;

  numberOfLines?: number;
  textAlignVertical?: any;
  messageInfo?: string;
}

const TextInputView = ({
  key,
  value,
  title,
  secureTextEntry,
  placeholder,
  messageError,
  isRequire,
  autoFocus,
  onChangeText,
  onEndEditing,
  onBlur,
  onFocus,
  leftIcon,
  refs,
  maxLength,
  editable,
  placeholderTextColor,
  onSubmitEditing,
  keyboardType,
  onPress,
  scrollEnabled,
  numberOfLines,
  textAlignVertical,
  messageInfo,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocus, setFocus] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={1} key={key}>
      {!!title && (
        <View style={styles.cotentIsRequire}>
          <Text style={[styles.titleStyle, messageError && { color: Colors.red }]}>{title}</Text>

          {isRequire && (
            <Text style={[styles.titleStyle, messageError && { color: Colors.red }]}>
              <Text style={{ color: Colors.red }}> *</Text>
            </Text>
          )}
        </View>
      )}
      <View style={[styles.textInputContainer, messageError && { borderColor: Colors.red }]}>
        {!!leftIcon && leftIcon}
        <TextInput
          autoFocus={autoFocus}
          value={value}
          ref={refs}
          style={[styles.textInput]}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || Colors.grayLight}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry && !showPassword}
          onSubmitEditing={() => {
            if (onSubmitEditing) {
              onSubmitEditing();
            }
            setFocus(false);
          }}
          onBlur={() => {
            setFocus(false);
            !!onBlur && onBlur();
          }}
          onEndEditing={() => {
            if (onEndEditing) {
              onEndEditing();
            }
            setFocus(false);
          }}
          autoCapitalize="none"
          editable={editable && !onPress}
          scrollEnabled={scrollEnabled}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          onFocus={() => {
            setFocus(true);
            !!onFocus && onFocus();
          }}
        />
        {isFocus && value?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onChangeText('');
            }}
            style={{ marginRight: 10 }}
          >
            <Ionicons name={'close-circle'} color={Colors.grayLight} size={18} />
          </TouchableOpacity>
        )}
      </View>

      {!!messageInfo && !messageError && (
        <Text
          style={{
            fontSize: responsiveFont(11),
            color: Colors.grayLight,
          }}
        >
          {messageInfo}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default TextInputView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  textInputContainer: {
    height: responsiveHeight(40),
    // minHeight: responsiveHeight(50),
    paddingHorizontal: responsiveWidth(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
  },
  textInput: {
    flex: 1,
    color: Colors.black,
    fontSize: responsiveFont(17),
    paddingVertical: responsiveHeight(5),
  },
  cotentIsRequire: {
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: responsiveFont(16),
    marginVertical: responsiveHeight(3),
    color: Colors.headerColor,
  },
});
