import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions, TextInput } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppSelector } from '../../../redux/hooks';
// import authService from '../../../services/auth';

// import groupService from '../../../services/group';
import User from '../../../utils/types';
import { TypeRequestGroup } from '../../../utils/contants';
import { removeAccents } from '../../../utils/handler';
import StudentOfList from './StudentOfList';

// import {AlertNotificationRoot} from 'react-native-alert-notification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
interface ListInvited {
  id: number;
  message: string;
  type: string;
  group: {
    id: number;
  };
  student: {
    id: number;
  };
}
const ItemGroup = () => {
  const termState = useAppSelector((state) => state.term);
  const [students, setStudents] = useState([]);
  const [studentsHaveGroup, setStudentsHaveGroup] = useState([]);

  const layout = useWindowDimensions();
  const [flag, setFlag] = useState(false);
  const [listStudentInvitedJoinGroup, setStudentInvitedJoinGroup] = useState<ListInvited[]>();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'not', title: 'Chưa có nhóm' },
    { key: 'have', title: 'Đã có nhóm' },
  ]);

  const ref = useRef(null);

  const [stateStudent, setStateStudent] = useState<{
    loading: boolean;
    data: Array<User>;
    searchValue: string;
  }>({
    loading: false,
    data: [],
    searchValue: '',
  });

  const [stateHaveStudent, setStateHaveStudent] = useState<{
    loading: boolean;
    data: Array<User>;
    searchValue: string;
  }>({
    loading: false,
    data: [],
    searchValue: '',
  });

  const getListStdentsNonGroup = useCallback(async (listStudentInvited: any[]) => {
    if (termState?.term?.id) {
      // await authService
      //   .getStudent(termState?.term?.id, false)
      //   .then((result) => {
      //     const checkInvited = (item: { id: number }) =>
      //       listStudentInvited?.find(
      //         (studentGroup: { student: { id: number } }) => studentGroup?.student?.id === item.id,
      //       );
      //     const resultTemp = result?.data.map((item: any) => ({
      //       ...item,
      //       invited: !!checkInvited(item),
      //     }));
      //     setStudents(resultTemp);
      //     setStateStudent({ ...stateStudent, data: resultTemp });
      //   })
      //   .catch((error) => console.log(error));
    }
  }, []);

  const getListStdentsHaveGroup = useCallback(async () => {
    if (termState?.term?.id) {
      // await authService
      //   .getStudent(termState?.term?.id, true)
      //   .then((result) => {
      //     setStudentsHaveGroup(result.data);
      //     setStateHaveStudent({ ...stateHaveStudent, data: result.data });
      //   })
      //   .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    const initData = async () => {
      await getListStdentsHaveGroup();
    };
    initData();
  }, []);

  useEffect(() => {
    getListInvitedJoinGroup();
  }, []);

  const getListInvitedJoinGroup = () => {
    if (termState?.term?.id) {
      // groupService
      //   .getMyrequestJoinGroup(termState?.term?.id, TypeRequestGroup.REQUEST_INVITE)
      //   .then(async (result) => {
      //     setStudentInvitedJoinGroup(result?.data);
      //     await getListStdentsNonGroup(result?.data);
      //   });
    }
  };

  const renderListStudents = (item: any) => {
    return (
      <StudentOfList
        notGroup
        isStudentInvited={item?.invited}
        termInfoGroup={termState?.term}
        studentInfo={item}
      />
    );
  };

  const renderListStudentsHaveGroup = (item: any) => {
    return <StudentOfList termInfoGroup={termState?.term} studentInfo={item} />;
  };

  const TabStudentNotGroup = () => {
    return (
      <>
        <View style={styles.search_content}>
          <Searchbar
            placeholder="Tìm kiếm"
            inputStyle={styles.input}
            style={{ backgroundColor: Colors.white }}
            icon={(...props) => (
              <Ionicons name="search-outline" size={24} color={Colors.blueBoder} />
            )}
            onChangeText={searchFunction}
            value={stateStudent.searchValue}
            autoCorrect={false}
            onIconPress={() => ref.current}
            ref={ref}
          />
        </View>
        {ListStudents}
      </>
    );
  };
  const TabStudentHaveGroup = () => {
    return (
      <>
        <View style={styles.search_content}>
          <Searchbar
            placeholder="Tìm kiếm"
            inputStyle={styles.input}
            style={{ backgroundColor: Colors.white }}
            icon={(...props) => (
              <Ionicons name="search-outline" size={24} color={Colors.blueBoder} />
            )}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={searchFunctionStudent}
            value={stateHaveStudent.searchValue}
          />
        </View>
        {ListStudentsHaveGroup}
      </>
    );
  };

  const renderScene = SceneMap({
    not: TabStudentNotGroup,
    have: TabStudentHaveGroup,
  });

  const searchFunction = (text: string) => {
    if (text.toUpperCase() === '') {
      setStateStudent({
        ...stateStudent,
        data: students,
        searchValue: '',
        loading: false,
      });
    } else {
      const text_data = removeAccents(text.toLowerCase());
      const updatedData = stateStudent.data.filter((item) => {
        const item_data = removeAccents(
          item.name ? item.name.toLowerCase() : ''.toString().toLowerCase(),
        );

        return item_data.includes(text_data);
      });

      setStateStudent({ data: updatedData, searchValue: text, loading: true });
    }
  };

  const searchFunctionStudent = (text: string) => {
    if (text.toUpperCase() === '') {
      setStateHaveStudent({
        ...stateStudent,
        data: studentsHaveGroup,
        searchValue: '',
        loading: false,
      });
    } else {
      const text_data = removeAccents(text.toLowerCase());
      const updatedData = stateHaveStudent.data.filter((item) => {
        const item_data = removeAccents(
          item.name ? item.name.toLowerCase() : ''.toString().toLowerCase(),
        );

        return item_data.includes(text_data);
      });

      setStateHaveStudent({
        data: updatedData,
        searchValue: text,
        loading: true,
      });
    }
  };

  const ListStudents = useMemo(() => {
    return (
      <>
        <View style={[styles.bottomContent]}>
          <View style={[styles.flatList]}>
            <FlatList
              extraData={stateStudent.data}
              data={stateStudent.data}
              renderItem={(item: any) => renderListStudents(item?.item)}
            />
          </View>
        </View>
      </>
    );
  }, [stateStudent, students, searchFunction]);

  const ListStudentsHaveGroup = useMemo(() => {
    return (
      <>
        <View style={[styles.bottomContent]}>
          <View style={[styles.flatList]}>
            <FlatList
              data={stateHaveStudent.data}
              renderItem={(item: any) => renderListStudentsHaveGroup(item?.item)}
            />
          </View>
        </View>
      </>
    );
  }, [stateHaveStudent.data, studentsHaveGroup]);
  return (
    <>
      {/* <AlertNotificationRoot>
        <View style={GlobalStyles.container}>
          <View style={styles.containner}>
            <Header
              title="Danh sách sinh viên"
              iconLeft={true}
              home={false}
              style={styles.header}
              back={true}
              iconRight={false}></Header>

            <TabView
              key={index.toString()}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
            />
          </View>
        </View>
      </AlertNotificationRoot> */}
    </>
  );
};

export default ItemGroup;

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
    height: '100%',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(20),
    paddingHorizontal: responsiveWidth(10),
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
  _content_Main: {
    height: '90%',
    width: '100%',
  },
  search_content: {
    height: responsiveHeight(60),
    width: '100%',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    backgroundColor: Colors.white,
  },
});
