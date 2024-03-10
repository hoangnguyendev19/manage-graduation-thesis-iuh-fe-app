import { useMemo, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Header from '../../components/Header';
import GlobalStyles from '../../themes/GlobalStyles';
import { Images } from '../../assets/images/Images';
import Line from '../../components/Line';
import TextItemAccount from './components/TextItemAccount';
import languages from '../../utils/languages';
import Colors from '../../themes/Colors';
import IconView from '../../components/IconView';
// import tokenService from '../../services/token';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../redux/hooks';
import { RouteNames } from '../../utils/contants';
import ModalAccount from './components/ModalAccount';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../utils/sizeScreen';

import { checkGenger, checkTypeTraining } from '../../utils/handler';
// import {AlertNotificationRoot} from 'react-native-alert-notification';
import { DataTable } from 'react-native-paper';
import { isEmpty, showMessageWarning } from '../../utils/handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account: React.FC<{}> = ({}) => {
  const navigation = useNavigation();

  const majorState = useAppSelector((state) => state.major.major);
  const userState = useAppSelector((state) => state.user.user);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    // tokenService.reset().then(() => navigation.navigate(RouteNames.loginNavigation));
  };

  const handleChangePass = () => {
    if (isEmpty(userState.email)) {
      showMessageWarning('Vui lòng cập nhật email');
    } else {
      navigation.navigate(RouteNames.ForgotPassword);
    }
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
          textRight={userState?.name}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].gender}
          textRight={checkGenger(userState?.gender)}
          line={true}
        ></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].schoolYear}
          textRight={userState?.schoolYear}
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
          textRight={userState?.phoneNumber}
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
      {/* <AlertNotificationRoot> */}
      <Header title="Thông tin" logo iconRight={true}></Header>

      <View style={styles.content}>
        <View style={[styles.update]}>
          <Image
            source={userState?.avatar ? { uri: userState?.avatar } : Images.avatar}
            style={styles.imgAvatar}
          />
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
      {/* </AlertNotificationRoot> */}

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
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    margin: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    shadowOffset: { width: 2, height: 3 },
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
