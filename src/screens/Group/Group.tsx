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
import { Topic } from '../../utils/types';
import ModelCreateGroup from './components/ModelCreateGroup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteNames } from '../../utils/contants';

const MENU = [
  {
    key: 'group',
    backgroupIcon: '#a2d2ff',
    borderIcon: '#0096c7',
    title: 'Thông tin nhóm',
    navigate: RouteNames.ItemGroup,
    icon: 'people-sharp',
    iconColor: '#0096c7',
  },
  {
    key: 'listGroup',
    backgroupIcon: '#fae1dd',
    borderIcon: '#fec5bb',
    title: 'Danh sách nhóm',
    navigate: RouteNames.ItemListGroup,
    icon: 'people-circle-outline',
    iconColor: '#f4978e',
  },
];

const Group: React.FC<{}> = () => {
  const termState = useAppSelector((state) => state.term);

  const [topic, setTopic] = useState<Topic>();

  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [showModalCreateGroup, setShowModalCreateGroup] = useState(false);

  const renderMenuItem = (item: any, index: any) => {
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
      <Header title="Nhóm" logo iconRight={true}></Header>
      <View style={[GlobalStyles.container, styles.container]}>
        {termState?.term?.isChooseGroup ? (
          <View style={styles.menu}>
            <FlatList data={MENU} renderItem={({ item, index }) => renderMenuItem(item, index)} />
          </View>
        ) : (
          <NoneData icon title="Chưa đến thời gian chọn nhóm"></NoneData>
        )}

        <ModelCreateGroup
          visible={showModalCreateGroup}
          title={'Tạo nhóm'}
          termCreateGroup={termState?.term}
          modalClose={setShowModalCreateGroup}
        ></ModelCreateGroup>
      </View>
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
