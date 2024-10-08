import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Lottie from 'lottie-react-native';
import Header from '../../components/Header';
import TouchViewMenu from '../../components/TouchViewMenu';
import Colors from '../../themes/Colors';
import GlobalStyles from '../../themes/GlobalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteNames } from '../../utils/contants';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../utils/sizeScreen';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import majorAPI from '../../api/major';
import termAPI from '../../api/term';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const menu = [
  {
    name: 'Học kỳ',
    key: 'term',
    navigation: RouteNames.TermMenu,
    icon: 'calendar-sharp',
    color: '#bc6c25',
    backgroundColor: Colors.white,
  },
  {
    name: 'Đề tài',
    key: 'topic',
    navigation: RouteNames.TopicMenu,
    icon: 'bookmarks-sharp',
    color: '#0077b6',
    backgroundColor: Colors.white,
  },
];

const menuBottom = [
  {
    name: 'Đánh giá',
    key: 'check',
    navigation: RouteNames.EvaluationMenu,
    icon: 'checkmark-done-circle',
    color: '#a7c957',
    backgroundColor: Colors.white,
  },
  {
    name: 'Nhóm',
    key: 'group',
    navigation: RouteNames.ItemListGroup,
    icon: 'people-sharp',
    color: '#f08080',
    backgroundColor: Colors.white,
  },
];

const HomeScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userState?.user?.majorId) {
      dispatch(majorAPI.getMajorById()(userState?.user?.majorId));
      dispatch(termAPI.getTermNow()(userState?.user?.majorId));
    }
  }, [userState]);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <Header logo title="Trang chủ" iconRight={true}></Header>
      <View style={styles.contentTop}>
        <View style={styles.iconUser}>
          <Lottie
            source={require('../../assets/jsonAmination/hello.json')}
            autoPlay
            style={{ width: 80, height: 80 }}
          />
        </View>

        <View style={styles.nameContent}>
          <Text style={styles.nameTitle}>{userState?.user?.fullName}</Text>
        </View>
      </View>
      <View style={[GlobalStyles.container, styles.content]}>
        <ScrollView>
          <View style={styles.top}>
            <View style={styles.topTop}>
              {menu.map((item, index) => (
                <View key={index} style={styles.iconRight}>
                  <Ionicons name={item.icon} color={item?.color} size={40} style={styles.icon} />
                  <TouchViewMenu
                    backgroundColor={item?.backgroundColor}
                    borderColor={item?.color}
                    onPress={() => navigation.navigate(item?.navigation)}
                    title={item.name}
                  ></TouchViewMenu>
                </View>
              ))}
            </View>

            <View style={styles.topTop}>
              {menuBottom.map((item, index) => (
                <View key={index} style={styles.iconRight}>
                  <Ionicons name={item.icon} color={item?.color} size={40} style={styles.icon} />
                  <TouchViewMenu
                    backgroundColor={item?.backgroundColor}
                    borderColor={item?.color}
                    onPress={() => navigation.navigate(item?.navigation)}
                    title={item.name}
                  ></TouchViewMenu>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  top: {
    justifyContent: 'center',
    alignContent: 'center',
  },

  topTop: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconRight: {},
  icon: {
    position: 'relative',
    right: responsiveWidth(-58),
    top: responsiveHeight(90),
    zIndex: 99999,
  },

  iconUser: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(10),
    borderRadius: 20,
    borderColor: '#ffb3c6',
    // backgroundColor: '#ffe5ec',
    borderWidth: 2,
  },
  contentTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderColor: Colors.bg,
    borderWidth: 1,
    shadowOpacity: 1,
    paddingVertical: responsiveHeight(2),
    shadowOffset: { width: 2, height: 3 },
  },

  nameTitle: {
    textAlign: 'center',
    fontSize: responsiveFont(20),
    color: '#941b0c',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  nameContent: {
    flexDirection: 'column',
    width: '50%',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(5),
    backgroundColor: Colors.white,
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
