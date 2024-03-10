import React from 'react';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import GlobalStyles from '../themes/GlobalStyles';
import { StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <>
      <Portal>
        <Modal visible style={[styles.contentModal, GlobalStyles.centerView]}>
          <ActivityIndicator size={'large'} color={'#bec7ef'} />
        </Modal>
      </Portal>
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  contentModal: {
    flex: 1,
  },
});
