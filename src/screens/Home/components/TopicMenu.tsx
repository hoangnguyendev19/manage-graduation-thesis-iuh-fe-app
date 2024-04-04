import React, { useEffect, useMemo, useState } from 'react';
import Lottie from 'lottie-react-native';
import 'moment/locale/vi';
import { StatusBar, StyleSheet, View, Text, FlatList } from 'react-native';

import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import NoneData from '../../../components/NoneData';
import topicService from '../../../services/topic';
import { Topic } from '../../../utils/types';
import ItemTopic from './ItemTopic';

import Loading from '../../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import groupService from '../../../services/group';
import { Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../utils/contants';

const TopicMenu = () => {
  const termState = useAppSelector((state) => state.term.term);
  const majorState = useAppSelector((state) => state.major.major);
  const userState = useAppSelector((state) => state.user.user);
  const [groupState, setGroupState] = useState<any>(null);
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);
  const [isLoadingTopic, setLoadingTopic] = useState(false);

  const [topics, setTopics] = useState<Topic[]>();
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoadingTopic(true);
    if (termState?.id) {
      topicService.getTopicList(termState?.id, majorState?.id).then((result) => {
        setLoadingTopic(false);

        const _data = result?.data?.topics?.filter(
          (i: { status: string }) => i.status === 'APPROVED',
        );

        setTopics(_data);
      });
    }
  }, [termState]);

  useEffect(() => {
    const getMyGroup = async () => {
      try {
        const { data } = await groupService.getMyGroup(termState?.id);

        if (data) {
          setGroupState(data.group);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    getMyGroup();
  }, [termState]);

  const handleChooseTopic = async (id: any) => {
    if (
      groupState?.members?.find(
        (mem: any) => mem.student_id === userState?.id && mem.isAdmin === true,
      )
    ) {
      setLoading(true);

      try {
        const { data } = await groupService.chooseTopic(groupState?.info?.id, id);

        if (data) {
          setLoading(false);
          navigation.navigate(RouteNames.HomeStack);
        }
      } catch (error) {
        setLoading(false);
        setError('Vui lòng thử lại');
        setVisible(true);
        console.log('error', error);
      }
    } else {
      setError('Bạn không phải là trưởng nhóm! Bạn không thể chọn đề tài!');
      setVisible(true);
    }
  };

  const handleCancelTopic = async () => {
    if (
      groupState?.members?.find(
        (mem: any) => mem.student_id === userState?.id && mem.isAdmin === true,
      )
    ) {
      setLoading(true);
      try {
        const { data } = await groupService.cancelTopic(groupState?.info?.id);

        if (data) {
          setLoading(false);
          navigation.navigate(RouteNames.HomeStack);
        }
      } catch (error) {
        setLoading(false);
        setError('Vui lòng thử lại');
        setVisible(true);
        console.log('error', error);
      }
    } else {
      setError('Bạn không phải là trưởng nhóm! Bạn không thể hủy đề tài!');
      setVisible(true);
    }
  };

  const renderTopicList = useMemo(() => {
    return (
      <>
        {topics?.length > 0 ? (
          <>
            <View style={[styles.contentTopic]}>
              <Lottie
                source={require('../../../assets/jsonAmination/loading_cricle.json')}
                autoPlay
                loop
                style={{ width: 60, height: 60 }}
              />
              <View style={styles.viewTitle}>
                <Text style={styles.topTitle}>DANH SÁCH ĐỀ TÀI</Text>
                <Text style={styles.topTitle}>Số lượng: {topics?.length}</Text>
              </View>
              <Lottie
                source={require('../../../assets/jsonAmination/right-arrow-seemore.json')}
                autoPlay
                loop
                style={styles.logoList}
              />
            </View>
            <FlatList
              data={topics}
              initialNumToRender={20}
              renderItem={(item: any) => (
                <ItemTopic
                  key={item?.item?.id}
                  topicInfo={item?.item}
                  handleChooseTopic={() => handleChooseTopic(item?.item?.id)}
                  handleCancelTopic={() => handleCancelTopic()}
                  groupState={groupState}
                />
              )}
            />
          </>
        ) : (
          <NoneData icon title="Học kỳ chưa có ĐỀ TÀI nào"></NoneData>
        )}
      </>
    );
  }, [topics]);
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header
        title="Đề tài"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={true}
      ></Header>

      {termState?.isChooseTopic === false ? (
        <View style={styles.nonChooseTopic}>
          <View style={styles.contentNoData}>
            <NoneData icon title="Chưa đến thời gian chọn đề tài!"></NoneData>
          </View>
        </View>
      ) : (
        <>
          {renderTopicList}
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

      {isLoading && <Loading />}
      {isLoadingTopic && <Loading />}
    </SafeAreaView>
  );
};

export default TopicMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
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
  dateNoChooseTopic: {
    fontSize: responsiveFont(18),
  },
  leftTitle: {
    color: Colors.rosyBrown,
    marginLeft: responsiveWidth(5),
    position: 'relative',
    top: -60,
    left: 30,
    fontWeight: '500',
  },
  logo: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    flexDirection: 'column',
  },
  viewIcon: {
    // backgroundColor: '#f2cc8f',
    borderRadius: 10,
    borderColor: '#a3cecf',
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  contentDate: {
    backgroundColor: '#a3cecf',
    borderRadius: 3,

    borderColor: Colors.blueBoder,
    borderWidth: 1,
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(9),
  },
  iconArrow: {
    width: 50,
    color: Colors.primary,
    height: 50,
  },
  titleStyle: {
    fontSize: responsiveFont(16),
    color: Colors.rosyBrown,
  },
  contentTopic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '10%',
    marginTop: responsiveHeight(10),
    // backgroundColor: '#bfd7ff',
    borderWidth: 2,
    borderColor: '#f08080',
    borderRadius: 5,
    paddingHorizontal: responsiveWidth(16),
    marginHorizontal: responsiveWidth(5),
  },
  topTitle: {
    position: 'relative',
    marginRight: responsiveWidth(20),
    fontSize: responsiveFont(17),
    // color: Colors.textPrimary,
    fontWeight: '600',
    paddingHorizontal: responsiveWidth(10),
  },
  subtitleStyle: {
    fontWeight: '500',
    color: Colors.black,
  },
  logoList: {
    width: 60,
    height: 60,
  },
  viewTitle: {
    flexDirection: 'column',
  },
});
