import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from '../../themes/Colors';
import Header from '../../components/Header';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';

import ButtonView from '../../components/ButtonView';
import GlobalStyles from '../../themes/GlobalStyles';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import authAPI from '../../api/auth';

import { responsiveFont, responsiveHeight, responsiveWidth } from '../../utils/sizeScreen';

import LoadingScreen from '../../components/Loading';
import { RouteNames } from '../../utils/contants';
import { Dialog, Portal } from 'react-native-paper';
import ButtonHandle from '../../components/ButtonHandle';
import { Snackbar } from 'react-native-paper';
import { Images } from '../../assets/images/Images';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login: React.FC<{}> = () => {
  const userState = useAppSelector((state) => state.user);
  const usernameRef = useRef();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const [isPassWord, setPassword] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [isResetPass, setResetPass] = useState(false);
  const [email, setEmail] = useState('');

  const [modalRestPass, setModalRestPass] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const hideDialog = () => setModalRestPass(false);

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPass('');
    }, []),
  );

  useEffect(() => {
    if (userState.user.id !== '') {
      navigation.navigate(RouteNames.HomeTab);
    }
    setLoading(false);
  }, [userState]);

  const handleCheck = () => {
    setPassword(!isPassWord);
  };

  const handleSubmit = async () => {
    if (username.trim().length >= 8) {
      if (password.trim().length <= 7) {
        setError('Mật khẩu phải lớn hơn 7 ký tự!');
        setVisible(true);
        setResetPass(false);
      } else {
        setErrorPass('');
        setLoading(true);
        try {
          await dispatch(
            authAPI.login()({
              username: username,
              password: password,
            }),
          );
        } catch (error) {
          setLoading(false);
          setError('Có lỗi xảy ra. Vui lòng thử lại!');
          setVisible(true);
        }
      }
    } else {
      setError('Tên đăng nhập phải lớn hơn 7 ký tự!');
      setVisible(true);
    }
    setLoading(false);
  };

  const handleResetPassword = () => {
    if (username !== '' && username.length >= 6) {
      setResetPass(true);
      // setTimeout(async () => {
      //   await authService
      //     .resetPassword({username: inputUserName})
      //     .then(result => {
      //       console.log('result', result);
      //       setModalRestPass(false);
      //       setResetPass(false);
      //       setInputUserName('');
      //       showMessageSuccess(
      //         `Đã gửi yêu cầu khôi phục mật khẩu đến email: ${result.data.email}`,
      //       );
      //     })
      //     .catch(er => {
      //       console.log('er', er);
      //       setModalRestPass(false);
      //       setResetPass(false);
      //       setInputUserName('');
      //       showMessageEror('Tên đăng nhập không tồn tại!');
      //     });
      // }, 5000);
    } else {
      setModalRestPass(false);
      // showMessageWarning('Vui lòng nhập tên lớn hơn 6 ký tự');
    }
  };

  const formLogin = useMemo(() => {
    return (
      <View style={styles.contentForm}>
        <Image source={Images.logo_iuh} style={{ width: 100, height: 40, resizeMode: 'contain' }} />
        <View style={[styles.contentInputTop]}>
          <View style={styles.viewInputTop}>
            <Ionicons name="person" color={Colors.iconbr} size={20} />
          </View>
          <TextInput
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            ref={usernameRef.current}
          />
        </View>

        <View style={[styles.contentInput, GlobalStyles.centerView]}>
          <View style={styles.viewInput}>
            <Ionicons name="key" color={Colors.iconbr} size={20} />
          </View>
          <TextInput
            placeholder={'Mật khẩu'}
            value={password}
            onChangeText={(text) => setPass(text)}
            secureTextEntry={isPassWord}
            style={styles.input}
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
          />

          <TouchableOpacity style={styles.iconRight} onPress={handleCheck}>
            {isPassWord === true ? (
              <Ionicons name="eye-off-outline" size={20} color={Colors.iconbr} />
            ) : (
              <Ionicons name="eye-outline" color={Colors.iconbr} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {errorPass && <Text style={GlobalStyles.textError}>{errorPass}</Text>}
        <View style={[GlobalStyles.flexEnd]}>
          <TouchableOpacity
            style={[styles.btnPass]}
            onPress={() => {
              setModalRestPass(true);
            }}
          >
            <Text style={GlobalStyles.rememberText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <ButtonView
          onPress={handleSubmit}
          title="Đăng nhập"
          disabled={false}
          style={styles.btn}
          textStyle={Colors.rosyBrown}
        />
      </View>
    );
  }, [errorPass, password, username, handleCheck, handleSubmit, usernameRef, userState]);

  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: Colors.white }]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.black} />
      <Header title="Đăng nhập" home></Header>

      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={responsiveHeight(130)}
          behavior={'position'}
        >
          <View style={styles.formView}>
            <View style={GlobalStyles.centerView}>
              <Lottie
                source={require('../../assets/jsonAmination/login.json')}
                autoPlay
                loop
                style={styles.logo}
              />
            </View>

            {formLogin}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {isLoading === true && <LoadingScreen />}
      {isResetPass === true && <LoadingScreen />}

      <Portal>
        <Dialog
          visible={modalRestPass}
          onDismiss={hideDialog}
          style={{ backgroundColor: Colors.white }}
        >
          <Dialog.Title style={styles.titleModal}>Lấy lại mật khẩu</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => setModalRestPass(false)}
              style={{
                paddingVertical: responsiveHeight(5),
                paddingHorizontal: responsiveWidth(25),
                borderRadius: 5,
                borderWidth: 1,
                borderStyle: 'solid',
                marginRight: responsiveWidth(10),
              }}
            >
              <Text style={{ fontSize: responsiveFont(16) }}>Đóng</Text>
            </Pressable>
            <ButtonHandle
              onPress={() => handleResetPassword()}
              icon
              iconName="paper-plane-outline"
              title="Gửi"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  formView: {
    marginTop: responsiveHeight(40),
    marginHorizontal: responsiveWidth(10),
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fae1dd',
    paddingLeft: responsiveWidth(40),
    fontSize: 16,
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(5),
  },
  inputModal: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#73c3ed',
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(20),
    fontSize: 16,
    backgroundColor: Colors.white,
  },

  buttonRegister: {
    marginTop: 5,
  },
  btnPass: {
    marginTop: 15,
  },
  viewInputTop: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 999,
    backgroundColor: Colors.white,
  },
  viewInput: {
    position: 'relative',
    left: 32,
    zIndex: 99999,
    backgroundColor: Colors.white,
  },
  seconIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentForm: {
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(5),
    backgroundColor: Colors.white,
    borderColor: '#fec89a',
    borderWidth: 1,
    shadowOpacity: 3,
    borderRadius: 10,
    shadowOffset: { width: 2, height: 3 },
  },
  contentInput: {
    flexDirection: 'row',
    marginTop: responsiveHeight(15),
  },
  contentInputTop: {
    position: 'relative',
    flexDirection: 'column',
    marginTop: responsiveHeight(15),
  },
  logo: {
    width: responsiveWidth(140),
    height: responsiveHeight(140),
    marginBottom: responsiveHeight(10),
    alignContent: 'center',
  },
  iconRight: {
    position: 'relative',
    right: 30,
  },
  btn: {
    borderColor: Colors.blueBoder,
  },
  titleModal: {
    fontSize: responsiveFont(16),
    fontWeight: 'bold',
    color: '#003049',
  },
});
