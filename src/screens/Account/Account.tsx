import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets/images/Images';
import Header from '../../components/Header';
import IconView from '../../components/IconView';
import Line from '../../components/Line';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Colors from '../../themes/Colors';
import GlobalStyles from '../../themes/GlobalStyles';
import { RouteNames } from '../../utils/contants';
import languages from '../../utils/languages';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../utils/sizeScreen';
import ModalAccount from './components/ModalAccount';
import TextItemAccount from './components/TextItemAccount';

import { Avatar, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import authAPI from '../../api/auth';
import { checkGender, checkTypeTraining, formatDob } from '../../utils/handler';

const Account: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const majorState = useAppSelector((state) => state.major.major);
  const userState = useAppSelector((state) => state.user.user);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(authAPI.logout()());
      navigation.navigate(RouteNames.LoginNavigation);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChangePass = () => {
    navigation.navigate(RouteNames.ChangePassword);
  };

  const renderMain = useMemo(
    () => (
      <ScrollView style={styles.main}>
        <TextItemAccount
          textLeft={languages['vi'].code}
          textRight={userState?.username}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].name}
          textRight={userState?.fullName}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].gender}
          textRight={checkGender(userState?.gender)}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].dob}
          textRight={formatDob(userState?.dateOfBirth)}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].clazzName}
          textRight={userState?.clazzName}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].special}
          textRight={majorState?.name}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].typeTraining}
          textRight={checkTypeTraining(userState?.typeTraining)}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].numberPhone}
          textRight={userState?.phone}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].email}
          textRight={userState?.email}
          line={true}
        ></TextItemAccount>
      </ScrollView>
    ),
    [userState, majorState],
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header title="Thông tin" logo iconRight={true}></Header>

      <View style={styles.content}>
        <View style={[styles.update]}>
          <Avatar.Image source={Images.avatar} size={80} style={styles.imgAvatar} />
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Lottie
              source={require('../../../src/assets/jsonAmination/update.json')}
              autoPlay
              loop
              style={styles.logo}
            />

            <Text style={GlobalStyles.textPrimary}>{languages['vi'].update}</Text>
          </TouchableOpacity>
        </View>
        <Line lager={true}></Line>

        {renderMain}
        <DataTable>
          <TouchableOpacity
            style={[GlobalStyles.flexDirectionRow, styles.btnAction]}
            onPress={handleChangePass}
          >
            <IconView name="key-outline" color={Colors.blueBoder} />
            <Text style={styles.itemAction}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </DataTable>

        <TouchableOpacity
          style={[GlobalStyles.flexDirectionRow, styles.btnAction]}
          onPress={handleLogout}
        >
          <View>
            <IconView name="log-out-outline" size={24} color={Colors.red} />
          </View>
          <Text style={styles.logout}>{languages['vi'].logout}</Text>
        </TouchableOpacity>
      </View>

      <ModalAccount
        visible={showModal}
        title={languages['vi'].updateInfo}
        onPressClose={setShowModal}
      />
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  content: {
    height: Dimensions.get('window').height,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
  },
  imgAvatar: {
    marginVertical: responsiveHeight(10),
    marginLeft: responsiveWidth(10),
  },
  main: {
    marginTop: 20,
    marginHorizontal: 20,
    maxHeight: 330,
  },
  logout: {
    color: Colors.red,
    fontSize: responsiveFont(15),
    marginLeft: 10,
  },
  itemAction: {
    color: Colors.blueBoder,
    fontSize: responsiveFont(15),
    paddingLeft: 10,
    fontWeight: '500',
  },
  update: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // position: 'relative',
    // top: 15,
    // zIndex: 99999,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: responsiveWidth(10),
  },
  logo: {
    width: 40,
    height: 40,
  },
  textPrimary: {
    fontSize: responsiveFont(16),
    color: Colors.drakCyonBoder,
  },
  btnAction: {
    // backgroundColor: '#ccf',
    paddingVertical: responsiveHeight(10),
    marginLeft: 20,
  },
  titleModal: {
    fontSize: responsiveFont(15),
    color: '#003049',
  },
  btn: {
    width: '100%',
  },
  view_Portal: {
    backgroundColor: '#e9d8a6',
  },
});
