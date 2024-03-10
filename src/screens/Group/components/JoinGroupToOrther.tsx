import React, { useEffect, useMemo, useState } from 'react';
import { View, Alert, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

// import groupService from '../../../services/group';
import { TypeRequestGroup } from '../../../utils/contants';
import LoadingScreen from '../../../components/Loading';
import NoneData from '../../../components/NoneData';
import { isEmpty } from 'lodash';
import groupAPI from '../../../api/group';
import ContentItemInvite from './ContentItemInvite';
import { showMessageEror, showMessageSuccess } from '../../../utils/handler';
// import {AlertNotificationRoot} from 'react-native-alert-notification';

const JoinGroupToOrther = () => {
  const layout = useWindowDimensions();
  const groupState = useAppSelector((state) => state.group.group);
  const termState = useAppSelector((state) => state.term);

  const [listRecied, setListRevied] = useState();
  const [listRequested, setListRequested] = useState();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'send', title: 'Đã Gửi' },
    { key: 'receid', title: 'Đã Nhận' },
  ]);

  useEffect(() => {
    getListReciedFromGroup();
  }, [isLoading]);

  useEffect(() => {
    getListRequestedToGroup();
  }, [isLoading]);

  const getListReciedFromGroup = () => {
    if (termState?.term?.id) {
      // groupService
      //   .getRequestJoinGroupOrder(termState?.term?.id, TypeRequestGroup.REQUEST_INVITE)
      //   .then((result) => {
      //     setListRevied(result?.data);
      //   });
    }
  };

  const getListRequestedToGroup = () => {
    if (termState?.term?.id) {
      // groupService
      //   .getRequestJoinGroupOrder(termState?.term?.id, TypeRequestGroup.REQUEST_JOIN)
      //   .then((result) => {
      //     setListRequested(result?.data);
      //   });
    }
  };

  const handleCancel = (id: number) => {
    setLoading(true);
    // groupService
    //   .deleteRequest(id)
    //   .then(() => {
    //     setLoading(false);
    //     showMessageSuccess('Đã xóa lời mời');
    //   })
    //   .catch(() => {});
  };

  const handleAccpect = async (id: number) => {
    setLoading(true);

    // groupService
    //   .acceptRequest(id)
    //   .then(() => {
    //     showMessageSuccess('Đã tham gia nhóm');
    //     setLoading(false);
    //     dispatch(groupAPI.getMyGroup()(termState?.term?.id));
    //   })
    //   .catch((er) => {
    //     setLoading(false);
    //     showMessageEror(er.response.data.error);
    //   });
  };

  const renderListInvite = (item: any) => {
    return (
      <ContentItemInvite
        onPressCancel={() => handleCancel(item?.id)}
        iconGroup={'people-sharp'}
        studentName={item?.group?.name}
        message={item?.message}
      />
    );
  };
  const renderListRevied = (item: any) => {
    return (
      <ContentItemInvite
        accept
        recied
        onPressCancel={() => handleCancel(item?.id)}
        onPressAccept={() => handleAccpect(item?.id)}
        iconGroup={'people-sharp'}
        studentName={item?.group?.name}
        message={item?.message}
      />
    );
  };

  const sendToGroup = () => {
    return <>{renderRequestSentToGroup}</>;
  };
  const reciedFromGroup = () => {
    return <>{renderRequesReciedFromGroup}</>;
  };

  const renderScene = SceneMap({
    send: sendToGroup,
    receid: reciedFromGroup,
  });

  const renderRequestSentToGroup = useMemo(() => {
    return (
      <>
        {groupState?.id ? (
          <NoneData icon title="Bạn đã có nhóm"></NoneData>
        ) : (
          <>
            {!isEmpty(listRequested) ? (
              <View style={[styles.bottomContent]}>
                <View style={[styles.flatList]}>
                  <FlatList
                    data={listRequested}
                    initialNumToRender={20}
                    renderItem={(item: any) => renderListInvite(item?.item)}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            ) : (
              <NoneData icon title="Chưa gửi yêu cầu nào!"></NoneData>
            )}
          </>
        )}
      </>
    );
  }, [listRequested]);

  const renderRequesReciedFromGroup = useMemo(() => {
    return (
      <>
        {groupState?.id ? (
          <NoneData icon title="Bạn đã có nhóm"></NoneData>
        ) : (
          <>
            {!isEmpty(listRecied) ? (
              <View style={[styles.bottomContent]}>
                <View style={[styles.flatList]}>
                  <FlatList
                    data={listRecied}
                    initialNumToRender={20}
                    renderItem={(item: any) => renderListRevied(item?.item)}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            ) : (
              <NoneData icon title="Không có lời mời tham gia nhóm!"></NoneData>
            )}
          </>
        )}
      </>
    );
  }, [listRecied]);
  return (
    <>
      {/* <AlertNotificationRoot>
        <View style={GlobalStyles.container}>
          <View style={styles.containner}>
            <Header
              title="Yêu cầu tham gia nhóm"
              iconLeft={true}
              home={false}
              style={styles.header}
              back={true}
              iconRight={false}></Header>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
            />
          </View>
        </View>
      </AlertNotificationRoot> */}

      {isLoading && <LoadingScreen />}
    </>
  );
};

export default JoinGroupToOrther;

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
    marginTop: responsiveHeight(20),
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
});
