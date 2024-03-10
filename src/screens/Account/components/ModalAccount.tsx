import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import CloseButton from '../../../components/CloseButton';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import DocumentPicker from 'react-native-document-picker';
import { Modal, Portal } from 'react-native-paper';
import languages from '../../../utils/languages';

import GlobalStyles from '../../../themes/GlobalStyles';
import TextInputView from '../../../components/TextInputView';
import IconView from '../../../components/IconView';
import { showMessageEror, showMessageSuccess, validateEmail } from '../../../utils/handler';
import GenderButton from '../../../components/GenderButton';
import { Images } from '../../../assets/images/Images';
import ButtonHandle from '../../../components/ButtonHandle';
import LoadingScreen from '../../../components/Loading';
// import { AlertNotificationRoot } from 'react-native-alert-notification';
// import authService from '../../../services/auth';
// import { updateUser } from '../../../redux/slices/UserSlices';

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
  const userState = useAppSelector((state) => state.user);
  const [selectedAvatar, setSelectedAvatar] = useState<ImagePicker | any>();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);

  const BASIC_INFO = [
    {
      key: 'code',
      placeholder: userState?.user?.id,
      title: `${languages['vi'].code}`,
    },
    {
      key: 'name',
      placeholder: userState?.user?.name,
      title: `${languages['vi'].name}`,
    },
    {
      key: 'gender',
      placeholder: userState?.user?.gender,
      title: `${languages['vi'].gender}`,
    },
    {
      key: 'schoolYear',
      placeholder: userState?.user?.schoolYear,
      title: `${languages['vi'].schoolYear}`,
    },
    {
      key: 'phoneNumber',
      placeholder: userState?.user?.phoneNumber,
      title: `${languages['vi'].numberPhone}`,
    },
    {
      key: 'email',
      placeholder: userState?.user?.email,
      title: `${languages['vi'].email}`,
    },
  ];

  const [basicInfo, setBasicInfo] = useState({
    avatar: selectedAvatar ? selectedAvatar : userState?.user?.avatar,
    username: userState?.user?.username,
    name: userState?.user?.name,
    gender: userState?.user?.gender || '',
    schoolYear: userState?.user?.schoolYear || '',
    typeTraining: userState?.user?.typeTraining,
    phoneNumber: userState?.user?.phoneNumber,
    email: userState?.user?.email,
  });

  const handleSubmitForm = async () => {
    setLoading(true);
    setBasicInfo({
      ...basicInfo,
    });

    const formData = new FormData();
    formData.append('username', basicInfo.username);
    formData.append('name', basicInfo.name);
    formData.append('gender', basicInfo.gender);
    formData.append('schoolYear', basicInfo.schoolYear);
    formData.append('typeTraining', basicInfo.typeTraining);
    formData.append('phoneNumber', basicInfo.phoneNumber);
    formData.append('email', basicInfo.email);

    if (selectedAvatar) {
      formData.append('avatar', selectedAvatar[0]);
    } else {
      formData.append('avatar', basicInfo?.avatar);
    }

    // await authService
    //   .updateUserInfo(formData)
    //   .then((result) => {
    //     showMessageSuccess('Cập nhật thành công!');
    //     setLoading(false);
    //     dispatch(updateUser(result.data));
    //     onPressClose(false);
    //   })
    //   .catch((er) => {
    //     if (er.response.data.code === 'DUPLICATE_EMAIL') {
    //       setLoading(false);
    //       showMessageEror('Email này đã tồn tại!');
    //       showMessageEror('Cập nhật không thành công!');
    //       onPressClose(false);
    //     } else {
    //       setLoading(false);
    //       showMessageEror('Cập nhật không thành công!');
    //       onPressClose(false);
    //     }
    //   });
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

  const handleGetAvatar = () => {
    if (selectedAvatar?.[0]?.uri) {
      return { uri: selectedAvatar?.[0]?.uri };
    }
    return basicInfo?.avatar ? { uri: basicInfo?.avatar } : Images.avatar;
  };

  const openPicker = async () => {
    try {
      // const res = await DocumentPicker.pick({
      //   // Provide which type of file you want user to pick
      //   type: [DocumentPicker.types.images],
      //   allowMultiSelection: true,
      // });
      // console.log('res : ' + JSON.stringify(res));
      // setSelectedAvatar(res);
    } catch (e: any) {
      console.log(e.code, e.message);
    }
  };

  const renderImage = useMemo(() => {
    return (
      <>
        <View style={[styles.contentImage, GlobalStyles.flexDirectionRow]}>
          <Image source={handleGetAvatar()} style={styles.imgAvatar} />
          <TouchableOpacity style={styles.contentIcon} onPress={openPicker}>
            <IconView name={'camera'} size={24} color={'#2c312c'} />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [selectedAvatar]);

  return (
    <>
      {/* <AlertNotificationRoot > */}
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
                {renderImage}
                <View style={styles.content}>
                  {BASIC_INFO.map((item, index) => {
                    if (item?.key === 'gender') {
                      return genderBlock(index);
                    }

                    const isUserName = () => item?.key === 'username';
                    return (
                      <TextInputView
                        key={index}
                        inputStyle={{
                          borderColor: Colors.blueBoder,
                          borderRadius: 6,
                        }}
                        isRequire={!isUserName()}
                        editable={!isUserName()}
                        title={item.title}
                        titleStyle={[styles.label]}
                        textInputStyle={{
                          fontSize: responsiveFont(14),
                          color: Colors.black,
                        }}
                        value={''}
                        placeholder={item.placeholder}
                        onChangeText={(text) => setBasicInfo({ ...basicInfo, [item.key]: text })}
                        style={{ marginBottom: responsiveHeight(20) }}
                        messageError={item.key === 'email' && isError}
                      />
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
      {/* </AlertNotificationRoot> */}
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
  imgAvatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    shadowOffset: { width: 2, height: 3 },
  },
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
