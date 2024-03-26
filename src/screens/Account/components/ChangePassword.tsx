import React, { useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../../themes/GlobalStyles';
import Header from '../../../components/Header';
import Colors from '../../../themes/Colors';
import { Images } from '../../../assets/images/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';

import ButtonView from '../../../components/ButtonView';
import authService from '../../../services/auth';
import LoadingScreen from '../../../components/Loading';
import { Snackbar } from 'react-native-paper';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [inputOldPassword, setInputOldPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [isPassWord, setPassword] = useState(true);
  const [isPassWordNew, setPasswordNew] = useState(true);
  const [isPassWordConfirm, setPasswordNewConfirm] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = (str: boolean) => {
    setPassword(!str);
  };

  const handleCheckNewPass = (str: boolean) => {
    setPasswordNew(!str);
  };
  const handleCheckConfirm = (str: boolean) => {
    setPasswordNewConfirm(!str);
  };

  const DATA_FORM = [
    {
      placeholder: 'Mật khẩu cũ',
      value: inputOldPassword,
      check: isPassWord,
      changeText: (text: string) => setInputOldPassword(text),
      handle: () => handleCheck(isPassWord),
    },
    {
      placeholder: 'Mật khẩu mới',
      value: inputNewPassword,
      check: isPassWordNew,
      changeText: (text: string) => setInputNewPassword(text),
      handle: () => handleCheckNewPass(isPassWordNew),
    },
    {
      placeholder: 'Xác nhận mật khẩu',
      value: inputConfirmPassword,
      check: isPassWordConfirm,
      changeText: (text: string) => setInputConfirmPassword(text),
      handle: () => handleCheckConfirm(isPassWordConfirm),
    },
  ];

  const comparePass = () => {
    return (
      inputNewPassword.toLocaleUpperCase().toString() ===
      inputConfirmPassword.toLocaleUpperCase().toString()
    );
  };

  const resetValue = () => {
    setInputOldPassword('');
    setInputNewPassword('');
    setInputConfirmPassword('');
  };

  const handleSubmit = async () => {
    if (inputOldPassword !== '' && inputNewPassword !== '' && inputConfirmPassword !== '') {
      if (inputOldPassword.length < 8 || inputNewPassword.length < 8) {
        setError('Mật khẩu phải lớn hơn 7 ký tự!');
        setVisible(true);
      } else {
        if (comparePass() === false) {
          setError('Mật khẩu không trùng khớp!');
          setVisible(true);
        } else {
          setLoading(true);
          const data = {
            password: inputOldPassword,
            newPassword: inputNewPassword,
          };

          const result = await authService.updatePassword(data);
          if (result.data.success === true) {
            setLoading(false);
            setError('Đổi mật khẩu thành công!');
            setVisible(true);
            resetValue();
          } else {
            setLoading(false);
            setError('Mật khẩu cũ không đúng!');
            setVisible(true);
          }
        }
      }
    } else {
      setError('Vui lòng nhập đầy đủ thông tin!');
      setVisible(true);
    }
  };

  const Form = useMemo(() => {
    return (
      <>
        <View style={styles.contentForm}>
          <Image
            source={Images.logo_iuh}
            style={{ width: 100, height: 40, resizeMode: 'contain' }}
          />
          {DATA_FORM.map((item, index) => {
            return (
              <View key={index} style={[styles.contentInput, GlobalStyles.centerView]}>
                <View style={styles.viewInput}>
                  <Ionicons name={'key'} color={Colors.iconbr} size={16} />
                </View>
                <TextInput
                  placeholder={item.placeholder}
                  value={item.value}
                  onChangeText={item.changeText}
                  secureTextEntry={item.check}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                />
                <TouchableOpacity style={styles.iconRight} onPress={item.handle}>
                  {item.check === true ? (
                    <Ionicons name={'eye-off-outline'} color={Colors.iconbr} size={16} />
                  ) : (
                    <Ionicons name={'eye-outline'} color={Colors.iconbr} size={16} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}

          <ButtonView
            title="Xác nhận"
            disabled={false}
            onPress={handleSubmit}
            style={styles.btn}
            textStyle={Colors.rosyBrown}
          />
        </View>
      </>
    );
  }, [inputConfirmPassword, inputNewPassword, inputOldPassword, isPassWord, handleCheck]);

  return (
    <>
      <View style={[GlobalStyles.container, { backgroundColor: Colors.white }]}>
        <Header iconLeft back={true} title="Đổi mật khẩu"></Header>
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={responsiveHeight(150)}
            behavior={'position'}
          >
            <View style={styles.formView}>{Form}</View>
          </KeyboardAvoidingView>
        </ScrollView>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'OK',
            onPress: () => {
              setVisible(false);
            },
          }}
        >
          {error}
        </Snackbar>
        {isLoading === true && <LoadingScreen />}
      </View>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentForm: {
    flexDirection: 'column',
    paddingHorizontal: responsiveHeight(15),
    paddingVertical: responsiveHeight(5),
    // paddingBottom: responsiveHeight(20),
    backgroundColor: Colors.white,
    borderColor: '#fec89a',
    borderWidth: 1,
    shadowOpacity: 3,
    borderRadius: 10,
    shadowOffset: { width: 2, height: 3 },
  },
  contentInputTop: {
    flexDirection: 'column',
    marginTop: responsiveHeight(15),
  },
  logo: {
    width: responsiveWidth(150),
    height: responsiveHeight(150),
    marginBottom: responsiveHeight(10),
    alignContent: 'center',
  },
  viewInputTop: {
    width: responsiveWidth(13),
    position: 'relative',
    left: 10,
    top: 35,
    zIndex: 99999,
    backgroundColor: Colors.white,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fae1dd',
    paddingHorizontal: responsiveWidth(35),
    paddingVertical: responsiveHeight(5),
    fontSize: 16,
  },
  contentInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: responsiveHeight(15),
  },
  viewInput: {
    width: responsiveWidth(13),
    position: 'relative',
    left: 22,
    zIndex: 99999,
    backgroundColor: Colors.white,
  },
  iconRight: {
    position: 'relative',
    left: -25,
  },
  btn: {
    borderColor: Colors.blueBoder,
    marginTop: responsiveHeight(50),
  },
  formView: {
    marginTop: '35%',
    marginHorizontal: responsiveWidth(10),
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
});
