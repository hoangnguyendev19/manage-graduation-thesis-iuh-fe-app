import React, { useEffect, useMemo, useState } from 'react';
import { Button, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Header';
import NoneData from '../../../components/NoneData';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import Notify from '../../../utils/types';
// import authService from '../../services/auth';
import { Card, Divider, Text } from 'react-native-paper';
import IconView from '../../../components/IconView';
import Colors from '../../../themes/Colors';
// import { FlatList } from 'react-native-gesture-handler';
import { showMessageSuccess } from '../../../utils/handler';
import { TypeNotificationPath } from '../../../utils/contants';
import { useNavigation } from '@react-navigation/native';
import { setNotySlice } from '../../../redux/slices/UserSlices';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

// import {AlertNotificationRoot} from 'react-native-alert-notification';

const notifyArr = [
  {
    id: 1,
    type: '',
    message: 'Thông báo 1',
    read: 0,
  },
  {
    id: 2,
    type: '',
    message: 'Thông báo 2',
    read: 0,
  },
  {
    id: 2,
    type: '',
    message: 'Thông báo 2',
    read: 1,
  },
];

const Notification = () => {
  const [notify, setNotify] = useState<Array<Notify>>(notifyArr);
  const userState = useAppSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getNotifyApi();
  }, []);

  const getNotifyApi = async () => {
    // authService
    //   .getAllMotify()
    //   .then((result) => {
    //     setNotify(result.data);
    //     let ary = [];
    //     result.data.forEach((i: { read: number }) => {
    //       if (i.read === 0) {
    //         ary.push(i);
    //       }
    //     });
    //     dispatch(setNotySlice(ary.length));
    //   })
    //   .catch((error) => console.log('errr', error));
  };

  const handleClickItem = async (id: number) => {
    const m = notify.filter((item) => id === item.id)[0];

    const path = TypeNotificationPath[m.type];

    // await authService
    //   .readNotify(id)
    //   .then((result) => {
    //     navigation.navigate(`${path}`);
    //     getNotifyApi();
    //   })
    //   .catch((error) => console.log('errr', error));
  };

  const handleReadAllNotify = async () => {
    // await authService
    //   .readAllNotify()
    //   .then((result) => {
    //     showMessageSuccess('Đánh dấu tất cả là đã đọc');
    //     getNotifyApi();
    //   })
    //   .catch((error) => console.log('errr', error));
  };

  const renderItemNoty = (item: Notify) => {
    return (
      <>
        <Card.Title
          style={[styles.itemContent, { backgroundColor: item.read === 0 ? '#ffffff' : '#eaf4f4' }]}
          title={
            <Text style={[styles.itemTitle, { color: item.read === 0 ? '#f07167' : '#6d6875' }]}>
              Thông báo
            </Text>
          }
          subtitle={
            <Text style={[styles.itemTitle, { color: item.read === 0 ? '#264653' : '#adb5bd' }]}>
              {item.message}
            </Text>
          }
          left={(props) => (
            <IconView
              name="notifications-outline"
              color={item.read === 0 ? '#38a3a5' : '#8d99ae'}
              size={24}
            />
          )}
          right={(props) => (
            <TouchableOpacity
              onPress={() => handleClickItem(item?.id)}
              // disabled={item.read === 0 ? false : true}
            >
              <IconView
                name="checkmark-done"
                color={item.read === 0 ? '#f07167' : '#6d6875'}
                size={24}
              />
            </TouchableOpacity>
          )}
        />
        <Divider />
      </>
    );
  };

  const renderNotify = useMemo(() => {
    return (
      <FlatList
        data={notify}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item: any) => renderItemNoty(item?.item)}
      />
    );
  }, [notify, userState?.notify]);

  const renderNewNotify = useMemo(() => {
    return (
      <Text style={styles.topTitleNumber}>
        Thông báo mới: {userState?.notify ? userState?.notify : 0}
      </Text>
    );
  }, [userState?.notify]);
  return (
    <View style={styles.containner}>
      {/* <AlertNotificationRoot> */}
      <Header
        title="Thông báo"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
      ></Header>

      <View style={styles.notyContent}>
        <View style={styles.top}>
          {renderNewNotify}

          <TouchableOpacity style={styles.topBtn} onPress={() => handleReadAllNotify()}>
            <Text style={styles.topTitle}>Đánh dấu tất cả là đã đọc</Text>
            <IconView name="checkmark-done" color={Colors.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        {renderNotify}
      </View>

      {/* </AlertNotificationRoot> */}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  notyContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  top: {
    paddingTop: responsiveHeight(20),
    height: responsiveHeight(60),
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(10),
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  topBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    display: 'flex',
  },
  topTitleNumber: {
    textAlign: 'right',
    fontSize: responsiveFont(15),
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#f4978e',
  },
  topTitle: {
    fontWeight: '600',
    textAlign: 'right',
    fontSize: responsiveFont(15),

    color: '#31572c',
  },
  itemTitle: {
    fontSize: responsiveFont(15),
  },
  itemContent: {
    paddingHorizontal: responsiveWidth(10),
  },
});
