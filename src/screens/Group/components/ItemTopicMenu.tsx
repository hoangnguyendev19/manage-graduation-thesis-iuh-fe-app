import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import Lottie from 'lottie-react-native';
import GlobalStyles from '../../../themes/GlobalStyles';
import Header from '../../../components/Header';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import NoneData from '../../../components/NoneData';
import {
  checkDegree,
  checkGender,
  getLevelColorTopic,
  getLevelTopic,
  getNameStatus,
} from '../../../utils/handler';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../utils/contants';
import { Topic } from '../../../utils/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../../../components/Loading';
import topicService from '../../../services/topic';
import { Avatar, DataTable, Divider, List, Modal } from 'react-native-paper';
import IconView from '../../../components/IconView';
import { Images } from '../../../assets/images/Images';

const ItemTopicMenu = ({ route }) => {
  const [topicInfo, setTopicInfo] = useState<Topic>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { topicId } = route.params;

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  const TOPIC_DATA = [
    { name: topicInfo?.description, key: 'Mô tả' },
    { name: topicInfo?.note, key: 'Ghi chú' },
    { name: topicInfo?.target, key: 'Mục tiêu' },
    { name: topicInfo?.standardOutput, key: 'Mục đích' },
    { name: topicInfo?.requireInput, key: 'Yêu cầu đầu vào' },
    { name: getNameStatus(String(topicInfo?.status)), key: 'Tình trạng' },
  ];
  const LECTURER_DATA = [
    { name: topicInfo?.lecturerTerm?.lecturer?.avatar, key: '' },
    { name: topicInfo?.lecturerTerm?.lecturer?.fullName, key: 'Tên Giảng viên' },
    { name: checkGender(topicInfo?.lecturerTerm?.lecturer?.gender), key: 'Giới tính' },
    { name: topicInfo?.lecturerTerm?.lecturer?.phone, key: 'Số điện thoại' },
    { name: checkDegree(topicInfo?.lecturerTerm?.lecturer?.degree), key: 'Trình độ' },
    { name: topicInfo?.lecturerTerm?.lecturer?.email, key: 'Email' },
  ];

  useEffect(() => {
    if (topicId) {
      const getTopic = async () => {
        setIsLoading(true);
        const { data } = await topicService.getTopicId(topicId);
        if (data) setTopicInfo(data.topic);
        setIsLoading(false);
      };

      getTopic();
    }
  }, [topicId]);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <Header
        title="Đề tài của nhóm"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={false}
      ></Header>

      {topicInfo ? (
        <>
          <ScrollView>
            <View style={styles.mainTopic}>
              <View style={styles.content_Top}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title
                      textStyle={[styles.textValue, { color: 'red', fontWeight: '700' }]}
                    >
                      Tên đề tài
                    </DataTable.Title>
                  </DataTable.Header>

                  <View style={styles.contentTop}>
                    <Text style={styles.textValue} numberOfLines={1}>
                      {topicInfo?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setContent(topicInfo?.name as string);
                        setVisible(true);
                      }}
                    >
                      <IconView name="ellipsis-vertical" color={Colors.grayLight} size={24} />
                    </TouchableOpacity>
                  </View>
                </DataTable>
              </View>
              <List.Section style={styles.content}>
                <List.Accordion
                  title={<Text>Thông tin</Text>}
                  right={(props) => null}
                  left={(props) => (
                    <Lottie
                      {...props}
                      source={require('../../../assets/jsonAmination/more-icon.json')}
                      autoPlay
                      loop
                      style={styles.iconMenu}
                    />
                  )}
                >
                  <ScrollView>
                    {TOPIC_DATA.map((item, index) => {
                      return (
                        <List.Item
                          key={index}
                          title={<Text style={styles.titleMain}>{item?.key}</Text>}
                          description={
                            <>
                              <Text style={styles.subTitle}>{item?.name}</Text>
                            </>
                          }
                          right={(props) => (
                            <TouchableOpacity
                              style={{ justifyContent: 'center' }}
                              onPress={() => {
                                setContent(item?.name as string);
                                setVisible(true);
                              }}
                            >
                              <IconView
                                {...props}
                                name="ellipsis-vertical"
                                color={Colors.grayLight}
                                size={24}
                              />
                            </TouchableOpacity>
                          )}
                        />
                      );
                    })}
                  </ScrollView>
                </List.Accordion>

                <List.Accordion
                  title={<Text>Giảng viên</Text>}
                  left={(props) => (
                    <Lottie
                      {...props}
                      source={require('../../../assets/jsonAmination/more-icon.json')}
                      autoPlay
                      loop
                      style={styles.iconMenu}
                    />
                  )}
                  right={(props) => null}
                  expanded={expanded}
                  onPress={handlePress}
                >
                  <ScrollView>
                    {LECTURER_DATA.map((item, index) => {
                      if (item?.key === '') {
                        return (
                          <View key={index} style={styles.contentAvatar}>
                            <Avatar.Image
                              source={item?.name ? { uri: item?.name } : Images.avatar}
                              size={60}
                            />

                            <Text style={styles.title}>
                              Mã GV: {topicInfo?.lecturerTerm?.lecturer?.username}
                            </Text>
                          </View>
                        );
                      }

                      return (
                        <List.Item
                          key={index}
                          title={<Text style={styles.titleMain}>{item?.key}</Text>}
                          description={
                            <>
                              <Text style={styles.subTitle}>{item?.name}</Text>
                            </>
                          }
                          right={(props) => (
                            <TouchableOpacity
                              onPress={() => {
                                setContent(item?.name as string);
                                setVisible(true);
                              }}
                              style={{ justifyContent: 'center' }}
                            >
                              <IconView
                                {...props}
                                name="ellipsis-vertical"
                                color={Colors.grayLight}
                                size={24}
                              />
                            </TouchableOpacity>
                          )}
                        />
                      );
                    })}
                  </ScrollView>
                </List.Accordion>
              </List.Section>
            </View>
          </ScrollView>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: '#fff',
              padding: 20,
              margin: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFont(18), textAlign: 'center' }}>
              Thông tin chi tiết
            </Text>
            <Divider />
            <Text
              style={{
                fontSize: responsiveFont(16),
                textAlign: 'center',
                marginVertical: responsiveHeight(20),
              }}
            >
              {content}
            </Text>
            <Pressable
              style={{
                backgroundColor: 'black',
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: '#fff', fontSize: responsiveFont(16) }}>Đóng</Text>
            </Pressable>
          </Modal>
        </>
      ) : (
        <View style={[GlobalStyles.centerView, styles.center]}>
          <NoneData icon title="Nhóm chưa có đề tài"></NoneData>
          <View style={styles.contentTopic}>
            <Lottie
              source={require('../../../assets/jsonAmination/right-arrow-seemore.json')}
              autoPlay
              loop
              style={{ width: 50, height: 50 }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteNames.TopicMenu);
              }}
            >
              <Text style={[styles.titleGroup]}>Chọn Đề tài</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default ItemTopicMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    marginVertical: responsiveHeight(20),
  },
  center: {
    flex: 1,
    backgroundColor: '#eaf4f4',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  contentTopic: {
    width: '100%',
    paddingVertical: responsiveHeight(5),
    backgroundColor: '#d9bcbc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(60),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
    textTransform: 'uppercase',
  },
  mainTopic: {
    backgroundColor: '#fff0f3',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(10),
  },
  contentTop: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: responsiveHeight(10),
    paddingLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  content_Top: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  iconMenu: {
    width: 50,
  },
  contentName: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingTop: responsiveHeight(10),
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: responsiveFont(14),
    color: Colors.headerColor,
  },
  titleMain: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  btn: {
    width: '40%',
  },
  btnCancel: {
    width: '50%',
    backgroundColor: '#f08080',
  },
  btn_dis: {
    width: '40%',
    backgroundColor: '#5e6e52',
    color: '#000',
  },
  textValue: {
    fontSize: responsiveFont(14),
    color: '#277da1',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  viewButton_text: {
    fontSize: responsiveFont(14),
    color: '#277da1',
    fontWeight: '500',
    textTransform: 'uppercase',
    marginLeft: responsiveWidth(5),
  },
  contentAvatar: {
    marginTop: responsiveHeight(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: responsiveFont(16),
    marginLeft: responsiveWidth(15),
    textTransform: 'uppercase',
  },
});
