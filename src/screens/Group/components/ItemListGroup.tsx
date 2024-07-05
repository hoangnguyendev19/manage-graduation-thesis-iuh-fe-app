import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import groupService from '../../../services/group';
import { useAppSelector } from '../../../redux/hooks';
import { Divider, Modal, Snackbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../utils/contants';

const ItemListGroup = () => {
  const navigation = useNavigation();
  const [listGroup, setListGroup] = useState<any[]>([]);
  const termState = useAppSelector((state) => state.term.term);
  // const [nameGroup, setNameGroup] = useState('');

  // const [showModal, setShowModal] = useState(false);
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

  const handleCreateGroup = async () => {
    // if (!nameGroup) {
    //   setError('Vui lòng nhập tên nhóm');
    //   setVisible(true);
    //   return;
    // }
    // try {
    //   const { data } = await groupService.createGroup({ termId: termState.id, name: nameGroup });
    //   if (data) {
    //     setListGroup([...listGroup, data.group]);
    //     setShowModal(false);
    //   }
    // } catch (error) {
    //   console.log('error', error);
    //   setError('Tên nhóm đã tồn tại hoặc bạn đã tham gia nhóm!');
    //   setVisible(true);
    // }
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
            Tên nhóm
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
          <Text>{group?.numOfMembers}</Text>
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
      {/* <Pressable
        style={{
          flexDirection: 'row',
          paddingVertical: responsiveHeight(5),
          paddingHorizontal: responsiveWidth(10),
          backgroundColor: Colors.black,
          marginLeft: 'auto',
          alignItems: 'center',
          borderRadius: 5,
          marginRight: responsiveWidth(15),
          marginVertical: responsiveHeight(10),
        }}
        onPress={() => setShowModal(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
        <Text style={{ color: '#fff', textAlign: 'center', marginLeft: responsiveWidth(5) }}>
          Thêm nhóm
        </Text>
      </Pressable> */}
      <FlatList
        style={{ paddingVertical: responsiveHeight(10), paddingHorizontal: responsiveHeight(15) }}
        data={listGroup}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemGroup {...item} />}
      />
      {/* <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: 20,
          margin: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: responsiveFont(18), textAlign: 'center' }}>
          Tạo nhóm
        </Text>
        <Divider />
        <TextInput
          label="Tên nhóm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            marginVertical: 10,
          }}
          value={nameGroup}
          onChangeText={(text) => setNameGroup(text)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            style={{
              backgroundColor: 'black',
              paddingVertical: responsiveHeight(10),
              paddingHorizontal: responsiveWidth(20),
              borderRadius: 5,
              marginLeft: 'auto',
              marginRight: responsiveWidth(10),
            }}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ color: '#fff', fontSize: responsiveFont(14) }}>Đóng</Text>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: responsiveHeight(10),
              paddingHorizontal: responsiveWidth(20),
              backgroundColor: 'green',
              borderRadius: 5,
            }}
            onPress={handleCreateGroup}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Tạo</Text>
          </Pressable>
        </View>
      </Modal> */}
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
    </SafeAreaView>
  );
};

export default ItemListGroup;
