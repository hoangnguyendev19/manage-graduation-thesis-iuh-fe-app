import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import { useAppSelector } from '../../../redux/hooks';
import groupService from '../../../services/group';
import Colors from '../../../themes/Colors';
import GlobalStyles from '../../../themes/GlobalStyles';
import { RouteNames } from '../../../utils/contants';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { validateDate } from '../../../utils/handler';
import NoneData from '../../../components/NoneData';

const ItemListGroup = () => {
  const navigation = useNavigation();
  const [listGroup, setListGroup] = useState<any[]>([]);
  const termState = useAppSelector((state) => state.term.term);

  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getListGroup = async () => {
      try {
        const { data } = await groupService.getListGroup(termState?.id);

        if (data) setListGroup(data.groupStudents);
      } catch (error) {
        console.log('error', error);
      }
    };

    getListGroup();
  }, [termState]);

  const handleJoinGroup = async (groupId: string) => {
    try {
      const { data } = await groupService.joinGroup(groupId);

      if (data) {
        const newGroup = listGroup.map((group) => {
          if (group.id === groupId) {
            return { ...group, total: group.total + 1 };
          }
          return group;
        });

        setListGroup(newGroup);
        navigation.navigate(RouteNames.ItemGroup);
      }
    } catch (error) {
      console.log('error', error);
      setError('Hiện tại bạn đã có nhóm!');
      setVisible(true);
    }
  };

  const ItemGroup = (group: any) => {
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: Colors.blueBoder,
          borderStyle: 'solid',
          paddingVertical: responsiveHeight(10),
          paddingHorizontal: responsiveWidth(10),
          marginBottom: responsiveHeight(10),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.headerColor,
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(20),
              textTransform: 'uppercase',
            }}
          >
            Mã nhóm
          </Text>
          <Text numberOfLines={1} style={{ flex: 1 }}>
            {group?.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.headerColor,
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(25),
              textTransform: 'uppercase',
            }}
          >
            Số lượng
          </Text>
          <Text>{group?.numOfMembers} / 2</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.headerColor,
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(10),
              textTransform: 'uppercase',
            }}
          >
            Tình trạng
          </Text>
          <Text
            style={{
              textTransform: 'uppercase',
              color: group?.numOfMembers >= 2 ? 'green' : Colors.red,
              fontStyle: 'italic',
            }}
          >
            {group?.numOfMembers >= 2 ? 'Đã đủ' : 'Chưa đủ'}
          </Text>
        </View>
        {group?.numOfMembers < 2 && (
          <Pressable
            style={{
              flexDirection: 'row',
              paddingVertical: responsiveHeight(5),
              paddingHorizontal: responsiveWidth(10),
              backgroundColor: 'green',
              marginLeft: 'auto',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => handleJoinGroup(group?.id)}
          >
            <Entypo name="login" size={24} color="white" />
            <Text style={{ color: 'white', marginLeft: responsiveWidth(5) }}>Tham gia</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header
        title="Danh sách nhóm"
        iconLeft={true}
        home={false}
        style={{ paddingHorizontal: responsiveWidth(10) }}
        back={true}
        iconRight={false}
      ></Header>
      {!validateDate(termState?.startChooseGroupDate, termState?.endChooseGroupDate) ? (
        <View style={styles.nonChooseTopic}>
          <View style={styles.contentNoData}>
            <NoneData icon title="Chưa đến thời gian chọn nhóm"></NoneData>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            style={{
              paddingVertical: responsiveHeight(10),
              paddingHorizontal: responsiveHeight(15),
            }}
            data={listGroup}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemGroup {...item} />}
          />
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: 'OK',
              onPress: () => {
                setVisible(false);
              },
            }}
          >
            {error}
          </Snackbar>
        </>
      )}
    </SafeAreaView>
  );
};

export default ItemListGroup;

const styles = StyleSheet.create({
  nonChooseTopic: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  contentNoData: {
    height: responsiveHeight(50),
  },
});
