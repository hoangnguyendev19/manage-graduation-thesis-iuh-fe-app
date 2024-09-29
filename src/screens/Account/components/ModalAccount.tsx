import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Modal, Portal, Snackbar } from 'react-native-paper';
import authAPI from '../../../api/auth';
import ButtonHandle from '../../../components/ButtonHandle';
import CloseButton from '../../../components/CloseButton';
import GenderButton from '../../../components/GenderButton';
import LoadingScreen from '../../../components/Loading';
import TextInputView from '../../../components/TextInputView';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Colors from '../../../themes/Colors';
import { formatDob, validateEmail } from '../../../utils/handler';
import languages from '../../../utils/languages';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';

interface Props {
  title: string;
  onPressClose: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}
interface ImagePicker {
  fileName: string;
  uri: string;
  type: string;
}
const ModalAccount: React.FC<Props> = ({ title, onPressClose, visible }) => {
  const userState = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const BASIC_INFO = [
    {
      key: 'code',
      placeholder: userState?.username,
      title: `${languages['vi'].code}`,
    },
    {
      key: 'fullName',
      placeholder: userState?.fullName,
      title: `${languages['vi'].name}`,
    },
    {
      key: 'gender',
      placeholder: userState?.gender,
      title: `${languages['vi'].gender}`,
    },
    {
      key: 'dob',
      placeholder: userState?.dateOfBirth,
      title: `${languages['vi'].dob}`,
    },
    {
      key: 'clazzName',
      placeholder: userState?.clazzName,
      title: `${languages['vi'].clazzName}`,
    },
    {
      key: 'phone',
      placeholder: userState?.phone,
      title: `${languages['vi'].numberPhone}`,
    },
    {
      key: 'email',
      placeholder: userState?.email,
      title: `${languages['vi'].email}`,
    },
  ];

  const [basicInfo, setBasicInfo] = useState({
    username: userState?.username || '',
    fullName: userState?.fullName || '',
    gender: userState?.gender || '',
    dob: userState?.dateOfBirth || '',
    clazzName: userState?.clazzName || '',
    typeTraining: userState?.typeTraining,
    phone: userState?.phone,
    email: userState?.email,
  });

  const handleSubmitForm = async () => {
    setLoading(true);

    const newUser = {
      fullName: basicInfo.fullName,
      gender: basicInfo.gender,
      dateOfBirth: basicInfo.dob,
      phone: basicInfo.phone,
      email: basicInfo.email,
    };

    try {
      await dispatch(authAPI.updateInfo()(newUser));
      setLoading(false);
      onPressClose(false);
    } catch (error) {
      setLoading(false);
      setShow(true);
      setError('Cập nhật không thành công!');
    }
  };

  const isError = basicInfo.email ? !validateEmail(basicInfo.email) : false;

  const genderBlock = (index: any) => {
    return (
      <View key={index} style={styles.contentRadio}>
        <Text style={styles.label}>{languages['vi'].gender}</Text>
        <Text style={{ color: Colors.red }}> *</Text>
        <View style={styles.leftRadio}>
          <View style={styles.rowRadio}>
            <GenderButton
              text="Nam"
              male={true}
              style={basicInfo.gender === 'MALE' ? Colors.rosyBrown : Colors.primaryButton}
              selected={basicInfo.gender === 'MALE'}
              onPress={() => setBasicInfo({ ...basicInfo, gender: 'MALE' })}
            />
          </View>

          <View style={styles.rowRadio}>
            <GenderButton
              text="Nữ"
              style={basicInfo.gender === 'FEMALE' ? Colors.rosyBrown : Colors.primaryButton}
              selected={basicInfo.gender === 'FEMALE'}
              onPress={() => setBasicInfo({ ...basicInfo, gender: 'FEMALE' })}
            />
          </View>
        </View>
      </View>
    );
  };

  const dobBlock = (index: any) => {
    return (
      <View key={index}>
        <Text style={styles.label}>{languages['vi'].dob}</Text>
        <View
          style={{
            height: responsiveHeight(40),
            paddingHorizontal: responsiveWidth(12),
            backgroundColor: Colors.white,
            borderColor: Colors.primary,
            borderRadius: 10,
            borderWidth: 2,
          }}
        >
          <TextInput
            textContentType="birthdate"
            placeholder="dd/mm/yyyy"
            value={formatDob(basicInfo.dob)}
            style={{
              flex: 1,
              color: Colors.black,
              fontSize: responsiveFont(17),
              paddingVertical: responsiveHeight(5),
            }}
            editable={false}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} style={{ marginHorizontal: responsiveWidth(10) }}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <CloseButton style={styles.logo} onPress={() => onPressClose(false)} />
          </View>
          <ScrollView>
            <KeyboardAvoidingView
              keyboardVerticalOffset={responsiveHeight(40)}
              behavior={'position'}
            >
              <View style={styles.contentForm}>
                <View style={styles.content}>
                  {BASIC_INFO.map((item, index) => {
                    if (item?.key === 'gender') {
                      return genderBlock(index);
                    }

                    if (item?.key === 'dob') {
                      return dobBlock(index);
                    }

                    const isUsername = () => item?.key === 'username';
                    const isCode = () => item?.key === 'code';
                    const isClazzName = () => item?.key === 'clazzName';

                    return (
                      <View key={index}>
                        <TextInputView
                          inputStyle={{
                            borderColor: Colors.blueBoder,
                            borderRadius: 6,
                          }}
                          isRequire={!isUsername() && !isCode() && !isClazzName()}
                          editable={!isUsername() && !isCode() && !isClazzName()}
                          title={item.title}
                          titleStyle={[styles.label]}
                          textInputStyle={{
                            fontSize: responsiveFont(14),
                            color: Colors.black,
                          }}
                          placeholder={item?.placeholder}
                          onChangeText={(text) => setBasicInfo({ ...basicInfo, [item.key]: text })}
                          style={{ marginBottom: responsiveHeight(20) }}
                          messageError={item.key === 'email' && isError}
                        />
                      </View>
                    );
                  })}
                </View>
                <View style={styles.viewBtn}>
                  <ButtonHandle
                    onPress={() => handleSubmitForm()}
                    style={styles.btn}
                    icon
                    title={languages['vi'].update}
                  ></ButtonHandle>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </Modal>
      </Portal>
      <Snackbar
        visible={show}
        onDismiss={() => setShow(false)}
        action={{
          label: 'OK',
          onPress: () => setShow(false),
        }}
      >
        {error}
      </Snackbar>
      {isLoading && <LoadingScreen />}
    </>
  );
};
export default ModalAccount;

const styles = StyleSheet.create({
  logo: {
    top: responsiveWidth(17),
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(16),
  },
  top: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(10),
  },
  topLeft: {
    flex: 1,

    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(15),
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFont(18),
    color: Colors.textPrimary,
    textAlign: 'center',
    backgroundColor: Colors.white,
    fontWeight: 'bold',
    margin: responsiveHeight(20),
  },
  main: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: responsiveWidth(15),
    marginTop: 25,
    fontSize: 16,
  },

  inputDefault: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(15),
    marginHorizontal: responsiveWidth(15),
    fontSize: 16,
  },
  inputDisable: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: '#edf6f9',
    fontSize: 16,
    marginLeft: responsiveWidth(20),
  },
  // imgAvatar: {
  //   width: 100,
  //   height: 100,
  //   resizeMode: 'contain',
  //   borderRadius: 50,
  //   borderColor: Colors.blueBoder,
  //   borderWidth: 1,
  //   shadowOpacity: 0.02,
  //   shadowOffset: { width: 2, height: 3 },
  // },
  viewBtn: {
    marginTop: responsiveHeight(20),
    alignItems: 'flex-end',
  },
  btn: {
    margin: responsiveHeight(16),
  },
  contentForm: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  contentRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(16),
  },
  viewRadio: {
    paddingHorizontal: responsiveWidth(10),
    flexDirection: 'row',
  },

  leftRadio: {
    flexDirection: 'row',
    width: '30%',
    marginLeft: responsiveWidth(30),
    justifyContent: 'space-between',
  },
  label: {
    fontSize: responsiveFont(16),
    marginVertical: responsiveHeight(3),
    color: Colors.headerColor,
  },
  rowRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentImage: {
    justifyContent: 'center',
    paddingLeft: responsiveWidth(20),
    marginVertical: responsiveHeight(10),
  },
  contentIcon: {
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(6),
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    position: 'relative',
    left: responsiveWidth(-30),
    top: responsiveHeight(30),
  },
});
