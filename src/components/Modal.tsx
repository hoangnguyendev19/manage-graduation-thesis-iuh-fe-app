import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Colors from '../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../utils/sizeScreen';
import CloseButton from './CloseButton';

interface Props {
  title: string;
  onPressClose: () => void;
  children: any;
}

const ModalView: React.FC<Props> = ({ title, onPressClose, children }) => {
  return (
    <Modal visible transparent animationType={'slide'}>
      <View style={{ backgroundColor: Colors.white }}>
        <Text style={styles.title}>{title}</Text>
        <CloseButton style={styles.logo} onPress={onPressClose} />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={[styles.content]}
          keyboardVerticalOffset={responsiveHeight(200)}
          behavior={'padding'}
        >
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFont(20),
    color: Colors.textPrimary,
    textAlign: 'center',
    backgroundColor: Colors.white,
    margin: responsiveHeight(20),
  },
  logo: {
    top: responsiveWidth(17),
  },
  content: {
    flex: 1,
    backgroundColor: Colors.red,
    paddingHorizontal: responsiveWidth(16),
  },
});

export default ModalView;

