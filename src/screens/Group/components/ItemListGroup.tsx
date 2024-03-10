import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Lottie from 'lottie-react-native';
import Header from '../../../components/Header';
import IconView from '../../../components/IconView';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppSelector } from '../../../redux/hooks';
// import groupService from '../../../services/group';
import GroupItem from './GroupItem';
// import {AlertNotificationRoot} from 'react-native-alert-notification';

const ItemListGroup = () => {
  const groupState = useAppSelector((state) => state.group);
  const termState = useAppSelector((state) => state.term);
  const [listGroup, setListGroup] = useState();

  const getListGroup = useCallback(async () => {
    if (termState?.term?.id) {
      // await groupService
      //   .getListGroup(termState?.term?.id)
      //   .then((result) => {
      //     setListGroup(result.data);
      //   })
      //   .catch((error) => console.log(error));
    }
  }, [groupState]);

  useEffect(() => {
    getListGroup();
  }, [termState, groupState]);

  const renderGroupList = useMemo(
    () => (item: any) => {
      return <GroupItem termInfoGroup={termState?.term} groupInfo={item} />;
    },
    [],
  );

  const ListGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={styles.contentTitle}>
              <View style={styles.viewIcon}>
                <IconView name="people-sharp" color={Colors.iconbr} size={26} />
              </View>
              <Text style={styles.titleGroup}>Danh sách nhóm</Text>
              <Lottie
                source={require('../../../assets/jsonAmination/62114-people-icons-lottie-animation.json')}
                autoPlay
                loop
                style={styles.amination}
              />
            </View>

            <View style={[styles.flatList]}>
              <FlatList
                data={listGroup}
                initialNumToRender={20}
                renderItem={(item: any) => renderGroupList(item?.item)}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [listGroup, groupState]);

  return (
    <>
      <View style={GlobalStyles.container}>
        {/* <AlertNotificationRoot>
          <View style={styles.containner}>
            <Header
              title="Danh sách nhóm"
              iconLeft={true}
              home={false}
              style={styles.header}
              back={true}
              iconRight={false}></Header>
            {ListGroup}
          </View>
        </AlertNotificationRoot> */}
      </View>
    </>
  );
};

export default ItemListGroup;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
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
    height: '85%',
  },
  amination: {
    right: responsiveWidth(-150),
  },
});
