import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppSelector } from '../../../redux/hooks';
// import majorService from '../../../services/major';
import Lecturer from '../../../utils/types';
import { List } from 'react-native-paper';

import { Images } from '../../../assets/images/Images';
import { checkDegree, checkGenger, checkRole, isEmpty } from '../../../utils/handler';
import LoadingScreen from '../../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const LectureMenu = () => {
  const majorState = useAppSelector((state) => state.major.major);
  const [lecturer, setLecturer] = useState<Lecturer[]>();
  const [list, setList] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getLecturersOfmajor();
  }, [majorState]);

  const getLecturersOfmajor = async () => {
    setLoading(true);
    if (!isEmpty(majorState?.id)) {
      // await majorService
      //   .getLecturerByMajor(Number(majorState?.id))
      //   .then((result) => {
      //     setLoading(false);
      //     setLecturer(result?.data);
      //     setList(result?.data?.length);
      //   })
      //   .catch((er) => console.log(er));
    }
  };

  const renderItem = (item: any) => {
    const LECTURER_DATA = [
      { name: item.avatar, key: '' },
      { name: item.name, key: 'Tên Giảng viên' },
      { name: checkRole(item.role), key: 'Chức vụ' },
      { name: checkGenger(item.gender), key: 'Giới tính' },
      { name: item.phoneNumber, key: 'Số điện thoại' },
      { name: checkDegree(item.degree), key: 'Trình độ' },
      { name: item.email, key: 'Email' },
    ];

    return (
      <View style={styles.contentListItem}>
        {LECTURER_DATA.map((i, index) => {
          if (i?.key === '') {
            return (
              <List.Item
                title={
                  <>
                    <Text numberOfLines={1} style={[styles.titleMain]}>
                      Mã giảng viên
                    </Text>
                  </>
                }
                description={
                  <Text numberOfLines={1} style={[styles.titleGroup]}>
                    {item?.username}
                  </Text>
                }
                left={(props) => (
                  <Image
                    source={i?.name ? { uri: i?.name } : Images.avatar}
                    style={styles.imgaAvatar}
                  />
                )}
              />
            );
          }
          return (
            <ScrollView>
              <List.Item
                key={index}
                title={
                  <>
                    <Text numberOfLines={1} style={[styles.titleMain]}>
                      {i?.key}
                    </Text>
                  </>
                }
                description={
                  <Text numberOfLines={1} style={[styles.titleGroup]}>
                    {i?.name}
                  </Text>
                }
                left={(props) => <View style={styles.iconContentView}></View>}
              />
            </ScrollView>
          );
        })}
      </View>
    );
  };

  const renderLecturerInfo = useMemo(() => {
    return (
      <>
        <View style={styles.list}>
          <Text style={styles.numberList}>Số lượng: {list}</Text>
        </View>
        <FlatList
          data={lecturer}
          renderItem={({ item }) => <View style={styles.contentListItem}>{renderItem(item)}</View>}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  }, [lecturer, list]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

      <View style={styles.containner}>
        <Header
          title="Giảng viên"
          iconLeft={true}
          home={false}
          style={styles.header}
          back={true}
          iconRight={true}
        ></Header>

        <View style={styles.content}>
          <View style={[styles.listTitle]}>
            <Text style={styles.contentName}>Chuyên ngành</Text>
            <Text style={styles.contentName}>{majorState?.name}</Text>
          </View>
          {renderLecturerInfo}
        </View>
      </View>
      {/* {isLoading && <LoadingScreen />} */}
    </SafeAreaView>
  );
};

export default LectureMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: '#e2fdff',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  content: {
    flex: 1,
    marginVertical: responsiveHeight(10),
    borderTopRightRadius: 10,
  },
  listTitle: {
    width: '90%',
    borderRadius: 3,
    flexDirection: 'column',
    borderLeftColor: '#c9184a',
    borderLeftWidth: 7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: responsiveWidth(20),
    paddingHorizontal: responsiveWidth(10),
    marginHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(10),
    shadowOffset: { width: 2, height: 3 },
  },
  contentName: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',

    textTransform: 'uppercase',
  },
  contentListItem: {
    flexDirection: 'column',
    width: responsiveWidth(330),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(10),
    borderColor: '#c9184a',
    borderWidth: 2,
    backgroundColor: Colors.white,
    shadowOpacity: 0.02,
  },
  titleMain: {
    fontSize: responsiveFont(18),
    color: Colors.grayLight,
  },
  number: {
    textAlign: 'center',
    fontSize: responsiveFont(20),
    color: '#003049',
    fontWeight: '600',
  },
  title: {
    fontSize: responsiveFont(18),
    color: '#c9184a',
    fontWeight: '600',
  },
  lecturerName: {
    backgroundColor: Colors.red,
    flexDirection: 'row',
  },
  viewIcon: {
    borderRadius: 10,
    marginLeft: responsiveWidth(10),
    borderLeftWidth: 1,

    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    // paddingHorizontal: responsiveWidth(15),
    textTransform: 'uppercase',
  },
  imgaAvatar: {
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
  iconContentView: {
    margin: 5,
  },
  list: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(5),
  },
  numberList: {
    fontSize: responsiveFont(14),
    color: '#003049',
    backgroundColor: '#f8ad9d',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ff4d6d',
    paddingHorizontal: responsiveHeight(10),
  },
});
