// import { is } from 'immer/dist/internal';
import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import IconView from '../../components/IconView';

import GlobalStyles from '../../themes/GlobalStyles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Colors from '../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../utils/sizeScreen';
import NoneData from '../../components/NoneData';
import ModalInfoGroup from './components/ModalInfoGroup';
// import topicService from '../../services/topic';
import Topic from '../../utils/types';
import ModelCreateGroup from './components/ModelCreateGroup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteNames } from '../../utils/contants';
// import {AlertNotificationRoot} from 'react-native-alert-notification';

const MENU = [
  {
    key: 'group',
  },
  {
    key: 'listGroup',
    backgroupIcon: '#a2d2ff',
    borderIcon: '#0096c7',
    title: 'Danh sách nhóm',
    navigate: RouteNames.ItemListGroup,
    icon: 'people-sharp',
    iconColor: '#0096c7',
  },
  {
    key: 'students',
    backgroupIcon: '#fae1dd',
    borderIcon: '#fec5bb',
    title: 'Danh sách sinh viên',
    navigate: RouteNames.ItemStudents,
    icon: 'people-circle-outline',
    iconColor: '#f4978e',
  },
  {
    key: 'students',
    backgroupIcon: '#caffbf',
    borderIcon: '#38b000',
    title: 'Yêu cầu tham gia nhóm',
    navigate: RouteNames.JoinGroupToOrther,
    icon: 'people-circle',
    iconColor: '#008000',
  },
  {
    key: 'students',
    backgroupIcon: '#f8edeb',
    borderIcon: '#bc4749',
    title: 'Lời mời tham gia nhóm',
    navigate: RouteNames.InviteJoinGroup,
    icon: 'person-add',
    iconColor: '#bc4749',
  },
  {
    key: 'topic',
    backgroupIcon: '#cce3de',
    borderIcon: '#6b9080',
    title: 'Đề tài',
    navigate: RouteNames.ItemTopicMenu,
    icon: 'book',
    iconColor: '#6b9080',
  },
];

const Group: React.FC<{}> = () => {
  const groupState = useAppSelector((state) => state.group);
  const termState = useAppSelector((state) => state.term);

  const [checkStartDate, setcheckStartDate] = useState(false);

  const [topic, setTopic] = useState<Topic>();

  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [showModalCreateGroup, setShowModalCreateGroup] = useState(false);

  const checkTermStart = () => {
    const start = new Date(termState?.term?.startDate);
    const nowDate = new Date();
    if (start < nowDate) {
      setcheckStartDate(true);
    }
  };

  useEffect(() => {
    checkTermStart();
    getInfoGroup();
  }, [checkStartDate, termState, groupState]);

  const GroupView = useMemo(() => {
    return (
      <>
        {groupState?.group?.id ? (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            style={[styles.content]}
          >
            <View style={styles.viewIcon}>
              <IconView name="grid-outline" color={Colors.iconbr} size={26} />
            </View>
            <Text style={styles.topTitle}>Xem thông tin nhóm</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowModalCreateGroup(true)} style={[styles.content]}>
            <View style={styles.viewIcon}>
              <IconView name="duplicate" color={Colors.iconbr} size={26} />
            </View>
            <View style={[styles.menuText, GlobalStyles.centerView]}>
              <Text numberOfLines={2} style={styles.topTitle}>
                Tạo nhóm mới
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }, [groupState?.group, topic, setShowModalCreateGroup]);

  const getInfoGroup = () => {
    // topicService.getTopicId(Number(groupState?.group?.topic?.id)).then((result) => {
    //   setTopic(result?.data);
    // });
  };

  const renderMenuItem = (item: any, index: any) => {
    if (item?.key === 'group') {
      return <View key={index}>{GroupView}</View>;
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate(item?.navigate)}
        style={[styles.content]}
      >
        <View
          style={[
            styles.viewIcon,
            {
              backgroundColor: item?.backgroupIcon ? item?.backgroupIcon : '#dda15e',
              borderColor: item?.borderIcon ? item?.borderIcon : '#ff9f1c',
            },
          ]}
        >
          <IconView name={item?.icon} color={item?.iconColor} size={26} />
        </View>
        <View style={[styles.menuText, GlobalStyles.centerView]}>
          <Text numberOfLines={2} style={styles.topTitle}>
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      {/* <AlertNotificationRoot> */}
      <Header title="Nhóm" logo iconRight={true}></Header>
      <View style={[GlobalStyles.container, styles.container]}>
        {/* {checkStartDate ? ( */}
        <View style={styles.menu}>
          <FlatList data={MENU} renderItem={({ item, index }) => renderMenuItem(item, index)} />
        </View>
        {/* ) : (
          <NoneData icon title="Chưa đến thời gian chọn nhóm"></NoneData>
        )} */}

        <ModalInfoGroup
          visible={showModal}
          infoGroup={groupState?.group}
          title={'Thông tin nhóm'}
          topicInfo={topic as Topic}
          termInfoGroup={termState?.term}
          modalClose={setShowModal}
        ></ModalInfoGroup>

        <ModelCreateGroup
          visible={showModalCreateGroup}
          title={'Tạo nhóm'}
          termCreateGroup={termState?.term}
          modalClose={setShowModalCreateGroup}
        ></ModelCreateGroup>
      </View>
      {/* </AlertNotificationRoot> */}
    </SafeAreaView>
  );
};
export default Group;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(10),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(20),
    paddingLeft: responsiveWidth(20),
    shadowOffset: { width: 2, height: 3 },
  },
  bottomContent: {
    alignItems: 'flex-start',
    height: '90%',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(20),
    shadowOffset: { width: 2, height: 3 },
  },
  topTitle: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
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
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
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
    width: Dimensions.get('window').width - responsiveWidth(20),
    height: '75%',
  },
  amination: {
    right: responsiveWidth(-150),
  },
  menu: {
    width: Dimensions.get('window').width,
    marginHorizontal: responsiveWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: responsiveWidth(20),
  },
});
