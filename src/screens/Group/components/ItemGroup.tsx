import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import NoneData from '../../../components/NoneData';
import { useAppSelector } from '../../../redux/hooks';
import groupService from '../../../services/group';
import Colors from '../../../themes/Colors';
import GlobalStyles from '../../../themes/GlobalStyles';
import { RouteNames } from '../../../utils/contants';
import { checkGender } from '../../../utils/handler';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';

interface Member {
  student_id: number;
  isAdmin: boolean;
  student: {
    username: string;
    fullName: string;
    avatar: string;
    phone: string;
    email: string;
    gender: string;
  };
}

const ItemGroup = () => {
  const [listMember, setListMember] = useState<Member[]>();
  const [infoGroup, setInfoGroup] = useState<any>(null);
  const termState = useAppSelector((state) => state.term.term);
  const userState = useAppSelector((state) => state.user.user);
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getInfoGroup = async () => {
      const { data } = await groupService.getMyGroup(termState?.id);

      if (data) {
        setListMember(data.group.members);
        setInfoGroup(data.group.info);
      }
    };

    getInfoGroup();
  }, []);

  const handleLeaveGroup = async () => {
    try {
      const { data } = await groupService.leaveGroup(infoGroup?.id);

      if (data) {
        navigation.navigate(RouteNames.GroupStack);
      }
    } catch (error) {
      console.log('error', error);
      setError('Rời nhóm thất bại!');
      setVisible(true);
    }
  };

  const handleAssignAdmin = async (studentId: number) => {
    try {
      const { data } = await groupService.assignAdmin(infoGroup?.id, studentId);

      if (data) {
        const newMembers = listMember?.map((item) => {
          if (item.student_id === studentId) {
            item.isAdmin = true;
          } else if (item.isAdmin) {
            item.isAdmin = false;
          }
          return item;
        });

        setListMember(newMembers);
      }
    } catch (error) {
      console.log('error', error);
      setError('Trao quyền thất bại!');
      setVisible(true);
    }
  };

  const handleRemoveMember = async (studentId: number) => {
    try {
      const { data } = await groupService.removeMember(infoGroup?.id, studentId);

      if (data) {
        const newMembers = listMember?.filter((item) => item.student_id !== studentId);
        setListMember(newMembers);
      }
    } catch (error) {
      console.log('error', error);
      setError('Xoá thất bại!');
      setVisible(true);
    }
  };

  const handleViewTopic = () => {
    navigation.navigate(RouteNames.TopicDetail, {
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
        {mem?.isAdmin && <Text style={{ fontWeight: 'bold' }}>(Trưởng nhóm)</Text>}
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
          <Text style={{ fontSize: responsiveFont(16) }}>{mem?.student?.username}</Text>
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
          <Text style={{ fontSize: responsiveFont(16) }}>{mem?.student?.phone}</Text>
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
                onPress={() => handleAssignAdmin(mem.student_id)}
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
                onPress={() => handleRemoveMember(mem.student_id)}
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
      {infoGroup && listMember?.length > 0 ? (
        <>
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
              Mã nhóm
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
          <FlatList
            data={listMember}
            keyExtractor={(item) => item.student_id.toString()}
            renderItem={({ item }) => <ItemMember {...item} />}
          />
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
              onPress={handleLeaveGroup}
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
        </>
      ) : (
        <NoneData title="Hiện tại bạn chưa có nhóm" />
      )}

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

export default ItemGroup;
