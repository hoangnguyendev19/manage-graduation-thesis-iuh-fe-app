import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import groupService from '../../../services/group';
// import User, { TypeRequestGroup } from '../../../utilities/contants';

import { isEmpty, showMessageEror, showMessageSuccess } from '../../../utils/handler';
import ContentItemInvite from './ContentItemInvite';
import LoadingScreen from '../../../components/Loading';
import groupAPI from '../../../api/group';
// import {AlertNotificationRoot} from 'react-native-alert-notification';

const InviteJoinGroup = () => {
  const layout = useWindowDimensions();
  const [listInvitedToStudent, setListInvitedToStudent] = useState<Array<User>>();
  const [listInviteReceidFromStudent, setInviteReceidFromStudent] = useState();

  const termState = useAppSelector((state) => state.term);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'send', title: 'Gửi Đến Sinh Viên' },
    { key: 'receid', title: 'Nhận Từ Sinh Viên' },
  ]);

  useEffect(() => {
    listInvited();
  }, [isLoading]);
  useEffect(() => {
    listRevied();
  }, [isLoading]);

  const listInvited = async () => {
    if (!isEmpty(termState?.term?.id)) {
      // await groupService
      //   .getMyrequestJoinGroup(termState?.term?.id, TypeRequestGroup.REQUEST_INVITE)
      //   .then((result) => {
      //     console.log('setListInvitedToStudent', result?.data);
      //     setListInvitedToStudent(result?.data);
      //   })
      //   .catch((error) => console.log('error', error));
    }
  };
  const listRevied = async () => {
    if (!isEmpty(termState?.term?.id)) {
      // await groupService
      //   .getMyrequestJoinGroup(termState?.term?.id, TypeRequestGroup.REQUEST_JOIN)
      //   .then((result) => {
      //     setInviteReceidFromStudent(result?.data);
      //   })
      //   .catch((error) => console.log('error', error));
    }
  };

  const InvitedStudentJionGroup = () => {
    return <>{renderInvitedStudentJionGroup}</>;
  };
  const ReciedRequestionGroup = () => {
    return <>{renderReciedRequestionGroup}</>;
  };

  const renderScene = SceneMap({
    send: InvitedStudentJionGroup,
    receid: ReciedRequestionGroup,
  });

  const handleCancel = (id: number) => {
    setLoading(true);

    // groupService
    //   .deleteRequest(id)
    //   .then(() => {
    //     setLoading(false);
    //     showMessageSuccess('Đã hủy yêu cầu');
    //   })
    //   .catch((er) => {
    //     setLoading(false);
    //     showMessageEror(er.response.data.error);
    //   });
  };

  const handleAccpect = async (id: number) => {
    setLoading(true);
    // groupService
    //   .acceptRequest(id)
    //   .then(() => {
    //     setLoading(false);
    //     showMessageSuccess('Đã duyệt tham gia nhóm');
    //   })
    //   .catch((er) => {
    //     showMessageEror(er.response.data.error);
    //     setLoading(false);
    //   });
    dispatch(groupAPI.getMyGroup()(termState?.term?.id));
  };

  const renderInviteStudentJionGroup = (item: any) => {
    return (
      <ContentItemInvite
        onPressCancel={() => handleCancel(item?.id)}
        studentName={item?.student?.name}
        message={item?.message}
      />
    );
  };

  const renderStudentReciedJionGroup = (item: any) => {
    return (
      <ContentItemInvite
        accept
        recied
        onPressCancel={() => handleCancel(item?.id)}
        onPressAccept={() => handleAccpect(item?.id)}
        iconGroup={'people-sharp'}
        studentName={item?.student?.name}
        message={item?.message}
      />
    );
  };

  const renderInvitedStudentJionGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={[styles.flatList]}>
              <FlatList
                data={listInvitedToStudent}
                initialNumToRender={20}
                renderItem={(item: any) => renderInviteStudentJionGroup(item?.item)}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [listInvitedToStudent]);

  const renderReciedRequestionGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={[styles.flatList]}>
              <FlatList
                data={listInviteReceidFromStudent}
                initialNumToRender={20}
                renderItem={(item: any) => renderStudentReciedJionGroup(item?.item)}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [listInviteReceidFromStudent]);
  return (
    <>
      {/* <AlertNotificationRoot>
        <View style={GlobalStyles.container}>
          <View style={styles.containner}>
            <Header
              title="Lời mời tham gia nhóm"
              iconLeft={true}
              home={false}
              style={styles.header}
              back={true}
              iconRight={false}></Header>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              style={styles.contentTab}
              initialLayout={{width: layout.width}}
            />
          </View>
          {isLoading && <LoadingScreen />}
        </View>
      </AlertNotificationRoot> */}
    </>
  );
};

export default InviteJoinGroup;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  bottomContent: {
    alignItems: 'flex-start',
    height: '90%',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    shadowOffset: { width: 2, height: 3 },
  },

  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
  },
  viewIcon: {
    borderRadius: 10,
    backgroundColor: '#dda15e',
    borderColor: '#ff9f1c',
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  viewIconGroup: {
    backgroundColor: '#fdffb6',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
    marginRight: responsiveWidth(10),
  },
  contentTitle: {
    width: '100%',
    paddingHorizontal: responsiveWidth(16),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: responsiveHeight(8),
    backgroundColor: '#a2d2ff',
  },
  flatList: {
    width: '100%',
    height: '75%',
  },
  amination: {
    right: responsiveWidth(-150),
  },
  contentTab: {},
});
