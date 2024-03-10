import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveFont, responsiveHeight } from '../../../utils/sizeScreen';
import ButtonView from '../../../components/ButtonView';
import Colors from '../../../themes/Colors';
import { Text } from 'react-native-paper';
import GlobalStyles from '../../../themes/GlobalStyles';
// import tokenService from '../../services/token';
import { useNavigation } from '@react-navigation/native';
import {RouteNames} from '../../../utils/contants';

const DisAcceptedUser = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // tokenService.reset().then(() => navigation.navigate(RouteNames.loginNavigation));
  };

  return (
    <View style={styles.containner}>
      <Text style={styles.title_Point}>
        Bạn không thể đăng nhập học kỳ này. Vui lòng kiểm tra lại
      </Text>
      <View style={GlobalStyles.centerView}>
        <ButtonView
          onPress={handleSubmit}
          title="Quay lại"
          disabled={false}
          style={styles.btn}
          warning
        />
      </View>
    </View>
  );
};

export default DisAcceptedUser;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '50%',
    backgroundColor: '#f77f00',

    borderColor: Colors.blueBoder,
  },
  title_Point: {
    textAlign: 'center',
    fontSize: responsiveFont(16),
    paddingVertical: responsiveHeight(10),
    color: '#f28482',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
