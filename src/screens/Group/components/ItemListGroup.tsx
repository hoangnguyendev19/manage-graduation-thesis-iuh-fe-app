import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import groupService from '../../../services/group';
import { useAppSelector } from '../../../redux/hooks';

const ItemListGroup = () => {
  const [listGroup, setListGroup] = useState<any[]>([]);
  const termState = useAppSelector((state) => state.term.term);
  const majorState = useAppSelector((state) => state.major.major);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListGroup = async () => {
      const { data } = await groupService.getListGroup(termState.id, majorState.id);

      if (data) setListGroup(data.groups);
    };

    getListGroup();
  }, []);

  const handleJoinGroup = async () => {};

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
          <Text>{group?.studentTerms?.length}</Text>
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
              color: group?.studentTerms?.length >= 2 ? 'green' : Colors.red,
              fontStyle: 'italic',
            }}
          >
            {group?.studentTerms?.length >= 2 ? 'Đã đủ' : 'Chưa đủ'}
          </Text>
        </View>
        {group?.studentTerms?.length < 2 && (
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
            onPress={handleJoinGroup}
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
      <FlatList
        style={{ paddingVertical: responsiveHeight(10), paddingHorizontal: responsiveHeight(15) }}
        data={listGroup}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemGroup {...item} />}
      />
    </SafeAreaView>
  );
};

export default ItemListGroup;
