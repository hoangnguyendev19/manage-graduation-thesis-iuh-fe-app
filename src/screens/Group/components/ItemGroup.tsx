import { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Pressable } from 'react-native';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppSelector } from '../../../redux/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import groupService from '../../../services/group';
import { Avatar } from 'react-native-paper';
import { checkGender } from '../../../utils/handler';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../utils/contants';

interface Member {
  student_id: number;
  isAdmin: boolean;
  student: {
    userName: string;
    fullName: string;
    avatarUrl: string;
    phoneNumber: string;
    email: string;
    gender: string;
  };
}

const ItemGroup = () => {
  const [listMember, setListMember] = useState<Member[]>();
  const [infoGroup, setInfoGroup] = useState<any>();
  const termState = useAppSelector((state) => state.term.term);
  const userState = useAppSelector((state) => state.user.user);
  const navigation = useNavigation();

  useEffect(() => {
    const getInfoGroup = async () => {
      const { data } = await groupService.getMyGroup(termState.id);

      if (data) {
        setListMember(data.group.members);
        setInfoGroup(data.group.info);
      }
    };

    getInfoGroup();
  }, []);

  const handleRemoveGroup = async () => {};
  const handleAssignAdmin = async () => {};
  const handleDeleteMember = async () => {};
  const handleViewTopic = () => {
    navigation.navigate(RouteNames.ItemTopicMenu, {
      topicId: infoGroup?.topic_id,
    });
  };

  const ItemMember = (mem: Member) => {
    return (
      <View
        style={{
          paddingVertical: responsiveHeight(10),
          paddingHorizontal: responsiveHeight(15),
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: Colors.blueBoder,
          marginVertical: responsiveHeight(10),
          marginHorizontal: responsiveWidth(10),
          borderRadius: 10,
        }}
      >
        {mem?.isAdmin ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image size={60} source={{ uri: mem?.student?.avatarUrl }} />
            <Text style={{ marginLeft: responsiveWidth(10), fontWeight: 'bold' }}>
              (Trưởng nhóm)
            </Text>
          </View>
        ) : (
          <Avatar.Image size={60} source={{ uri: mem?.student?.avatarUrl }} />
        )}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(15) }}
        >
          <Text
            style={{
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(15),
              fontWeight: 'bold',
              color: Colors.headerColor,
            }}
          >
            MSSV:
          </Text>
          <Text style={{ fontSize: responsiveFont(16) }}>{mem?.student?.userName}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(10) }}
        >
          <Text
            style={{
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(15),
              fontWeight: 'bold',
              color: Colors.headerColor,
            }}
          >
            Họ tên:
          </Text>
          <Text style={{ fontSize: responsiveFont(16) }}>{mem?.student?.fullName}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(10) }}
        >
          <Text
            style={{
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(15),
              fontWeight: 'bold',
              color: Colors.headerColor,
            }}
          >
            Giới tính:
          </Text>
          <Text style={{ fontSize: responsiveFont(16) }}>{checkGender(mem?.student?.gender)}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(10) }}
        >
          <Text
            style={{
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(15),
              fontWeight: 'bold',
              color: Colors.headerColor,
            }}
          >
            Số điện thoại:
          </Text>
          <Text style={{ fontSize: responsiveFont(16) }}>{mem?.student?.phoneNumber}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(10) }}
        >
          <Text
            style={{
              fontSize: responsiveFont(16),
              marginRight: responsiveWidth(15),
              fontWeight: 'bold',
              color: Colors.headerColor,
            }}
          >
            Email:
          </Text>
          <Text style={{ fontSize: responsiveFont(16) }}>{mem?.student?.email}</Text>
        </View>
        {!mem?.isAdmin &&
          listMember?.find((item) => item.student_id === userState.id && item.isAdmin) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: responsiveHeight(20),
                justifyContent: 'space-between',
              }}
            >
              <Pressable
                style={{
                  backgroundColor: Colors.primaryButton,
                  paddingVertical: responsiveHeight(5),
                  paddingHorizontal: responsiveWidth(10),
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={handleAssignAdmin}
              >
                <MaterialIcons name="admin-panel-settings" size={24} color="white" />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFont(14),
                    paddingLeft: responsiveWidth(10),
                  }}
                >
                  Trao quyền
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: Colors.red,
                  paddingVertical: responsiveHeight(5),
                  paddingHorizontal: responsiveWidth(10),
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={handleDeleteMember}
              >
                <Ionicons name="exit-outline" size={22} color="white" />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFont(14),
                    paddingLeft: responsiveWidth(10),
                  }}
                >
                  Xoá khỏi nhóm
                </Text>
              </Pressable>
            </View>
          )}
      </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header
        title="Thông tin nhóm"
        iconLeft={true}
        home={false}
        style={{ paddingHorizontal: responsiveWidth(10) }}
        back={true}
        iconRight={false}
      ></Header>
      <View
        style={{
          paddingVertical: responsiveHeight(10),
          paddingHorizontal: responsiveHeight(15),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}
      >
        <Text
          style={{
            fontSize: responsiveFont(18),
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: Colors.textPrimary,
          }}
        >
          Tên nhóm
        </Text>
        <Text style={{ fontSize: responsiveFont(14) }}>{infoGroup?.name}</Text>
      </View>
      <View
        style={{
          paddingVertical: responsiveHeight(10),
          paddingHorizontal: responsiveHeight(15),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}
      >
        <Text
          style={{
            fontSize: responsiveFont(18),
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: Colors.textPrimary,
          }}
        >
          Danh sách thành viên
        </Text>
        <Text style={{ fontSize: responsiveFont(14) }}>Số lượng: {listMember?.length}</Text>
      </View>
      {listMember && (
        <FlatList
          data={listMember}
          keyExtractor={(item) => item.student_id.toString()}
          renderItem={({ item }) => <ItemMember {...item} />}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: responsiveHeight(20),
          marginHorizontal: responsiveWidth(15),
        }}
      >
        <Pressable
          style={{
            backgroundColor: 'green',
            paddingVertical: responsiveHeight(5),
            paddingHorizontal: responsiveWidth(10),
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={handleViewTopic}
        >
          <AntDesign name="search1" size={22} color="white" />
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFont(14),
              paddingLeft: responsiveWidth(10),
            }}
          >
            Xem đề tài
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Colors.red,
            paddingVertical: responsiveHeight(5),
            paddingHorizontal: responsiveWidth(10),
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={handleRemoveGroup}
        >
          <Ionicons name="exit-outline" size={22} color="white" />
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFont(14),
              paddingLeft: responsiveWidth(10),
            }}
          >
            Rời khỏi nhóm
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ItemGroup;
