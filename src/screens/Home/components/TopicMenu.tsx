import React, { useEffect, useMemo, useState } from 'react';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import 'moment/locale/vi';
import { StatusBar, StyleSheet, View, Text, FlatList } from 'react-native';

import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';

import NoneData from '../../../components/NoneData';
import { Card } from 'react-native-paper';
import IconView from '../../../components/IconView';
import topicService from '../../../services/topic';
import { Topic } from '../../../utils/types';
import ItemTopic from './ItemTopic';

import Loading from '../../../components/Loading';
import groupAPI from '../../../api/group';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopicMenu = () => {
  const termState = useAppSelector((state) => state.term.term);
  const groupState = useAppSelector((state) => state.group.group);
  const majorState = useAppSelector((state) => state.major.major);

  const [isLoading, setLoading] = useState(false);
  const [isLoadingTopic, setLoadingTopic] = useState(false);

  const [topics, setTopics] = useState<Topic[]>();

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

  const dispatch = useAppDispatch();

  // var startDateChooseTopicFormat = moment(termState?.startDateChooseTopic)
  //   .locale('vi')
  //   .format('dddd, DD/MM/YYYY, h:mm:ss A');

  // const renderContentTopic = useMemo(() => {
  //   return (
  //     <View style={styles.content}>
  //       <FlatList
  //         horizontal={true}
  //         data={DATETOPIC}
  //         initialNumToRender={20}
  //         renderItem={(item: any) => renderBannerDate(item?.item)}
  //         keyExtractor={(item) => item.icon}
  //       />
  //     </View>
  //   );
  // }, []);

  useEffect(() => {
    if (termState?.id) {
      dispatch(groupAPI.getMyGroup()(termState?.id));
    }
  }, [termState]);

  const handleChosseTopic = async (id: any) => {
    setLoading(true);
    // await topicService
    //   .chooseTopic(termState?.id, id)
    //   .then(async (result) => {
    //     setLoading(false);
    //     showMessageSuccess('Đã chọn đề tài');
    //     await dispatch(groupAPI.getMyGroup()(termState?.id));
    //   })
    //   .catch((er) => {
    //     showMessageEror('Vui lòng thử lại');
    //     setLoading(false);
    //   });
  };
  const handleCancelTopic = async (id: any) => {
    setLoading(true);
    // await topicService
    //   .cancelTopic(termState?.id)
    //   .then(async (result) => {
    //     setLoading(false);
    //     showMessageSuccess('Hủy thành công');
    //     await dispatch(groupAPI.getMyGroup()(termState?.id));
    //   })
    //   .catch((er) => {
    //     setLoading(false);
    //     showMessageEror('Vui lòng thử lại');
    //     console.log('ẻ', er);
    //   });
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
                  handleChosseTopic={() => handleChosseTopic(item?.item?.id)}
                  handleCancelTopic={() => handleCancelTopic(item?.item?.id)}
                />
              )}
            />
          </>
        ) : (
          <NoneData icon title="Học kỳ chưa có ĐỀ TÀI nào"></NoneData>
        )}
      </>
    );
  }, [topics, groupState]);
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* <AlertNotificationRoot> */}
      <Header
        title="Đề tài"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={true}
      ></Header>

      {/* {termState?.isChooseTopic === false ? (
        <View style={styles.nonChooseTopic}>
          <View style={styles.contentNoData}>
            <NoneData icon title="Chưa đến thời gian chọn đề tài!"></NoneData>
          </View>
        </View>
      ) : ( */}
      <>
        {/* {renderContentTopic} */}
        {renderTopicList}
      </>
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
