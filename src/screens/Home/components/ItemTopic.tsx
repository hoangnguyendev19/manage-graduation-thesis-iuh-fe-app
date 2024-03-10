import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, List } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import IconView from '../../../components/IconView';
import Colors from '../../../themes/Colors';
import Topic from '../../../utils/types';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import ModalDes from './ModalDes';
import ButtonHandle from '../../../components/ButtonHandle';
import GlobalStyles from '../../../themes/GlobalStyles';
import { useAppSelector } from '../../../redux/hooks';
import { Images } from '../../../assets/images/Images';
// import { AlertNotificationRoot } from 'react-native-alert-notification';
import { isEmpty } from '../../../utils/handler';
import { getLevelColorTopic, getLevelTopic, getNameStatus } from '../../../utils/handler';

interface Props {
  topicInfo?: Topic;
  handleChosseTopic(): void;
  handleCancelTopic(): void;
  count?: number;
}

const ItemTopic = ({ topicInfo, handleChosseTopic, handleCancelTopic }: Props) => {
  const groupState = useAppSelector((state) => state.group.group);
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [ismodal, showModal] = useState(false);
  const [valueModal, setValueModal] = useState<string>();
  const [allow, setAllow] = useState(true);

  const membermaxOfGroup = topicInfo?.totalGroupChoose;

  const TOPIC_DATA = [
    { name: topicInfo?.quantityGroupMax, key: 'Số lượng nhóm tối đa' },
    {
      name: topicInfo?.totalGroupChoose ? topicInfo?.totalGroupChoose : '0',
      key: 'Số lượng nhóm đã chọn',
    },
    { name: topicInfo?.description, key: 'Mô tả' },
    { name: topicInfo?.note, key: 'Ghi chú' },
    { name: topicInfo?.target, key: 'Mục tiêu' },
    { name: topicInfo?.standradOutput, key: 'Mục đích' },
    { name: topicInfo?.requireInput, key: 'Yêu cầu đầu vào' },
    { name: getNameStatus(String(topicInfo?.status)), key: 'Tình trạng' },
  ];
  const LECTURER_DATA = [
    { name: topicInfo?.lecturer?.avatar, key: '' },

    { name: topicInfo?.lecturer?.name, key: 'Tên Giảng viên' },
    { name: topicInfo?.lecturer?.gender, key: 'Giới tính' },
    { name: topicInfo?.lecturer?.phoneNumber, key: 'Số điện thoại' },
    { name: topicInfo?.lecturer?.degree, key: 'Trình độ' },
    { name: topicInfo?.lecturer?.email, key: 'Email' },
  ];

  const renderButton = useMemo(() => {
    return (
      <>
        {groupState?.id ? (
          <View style={GlobalStyles.centerView}>
            {groupState?.topic?.id ? (
              <>
                {topicInfo?.id === groupState?.topic?.id && (
                  <ButtonHandle
                    style={styles.btnCancel}
                    onPress={handleCancelTopic}
                    colorIcon={Colors.red}
                    iconName="ios-close-outline"
                    title="Hủy chọn đề tài"
                  />
                )}
              </>
            ) : (
              <View style={styles.vewButton}>
                <ButtonHandle
                  style={styles.btn}
                  onPress={handleChosseTopic}
                  colorIcon={Colors.white}
                  iconName="md-arrow-redo-outline"
                  title="Chọn đề tài"
                />
                <Text style={styles.vewButton_text}>Nhóm đã chọn đề tài: {membermaxOfGroup}</Text>
              </View>
            )}
          </View>
        ) : (
          <ButtonHandle
            disabled={true}
            style={styles.btn_dis}
            colorIcon={Colors.grayLight}
            iconName="md-arrow-redo-outline"
            title="Chọn đề tài"
          />
        )}
      </>
    );
  }, [groupState?.topic?.id, groupState?.id]);

  return (
    <>
      <View style={styles.mainTopic}>
        <View style={styles.content_Top}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={[styles.textValue, { color: 'red', fontWeight: '700' }]}>
                Tên đề tài
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.contentTop}>
              <Text style={styles.textValue} numberOfLines={1}>
                {topicInfo?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  showModal(true);
                  setValueModal(topicInfo?.name as string);
                }}
              >
                <IconView name="ios-ellipsis-vertical" color={Colors.grayLight} size={24} />
              </TouchableOpacity>
            </View>
          </DataTable>

          <View style={styles.contentTopLevel}>
            <Text style={[styles.textValue]} numberOfLines={1}>
              Cấp độ đề tài:{' '}
            </Text>
            <Text
              style={[
                styles.textValue,
                {
                  color: getLevelColorTopic(String(topicInfo?.level))
                    ? getLevelColorTopic(String(topicInfo?.level))
                    : Colors.grayLight,
                },
              ]}
            >
              {getLevelTopic(String(topicInfo?.level))
                ? getLevelTopic(String(topicInfo?.level))
                : 'Chưa xác định'}
            </Text>
          </View>
        </View>
        {renderButton}
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
            <ScrollView style={{ height: 200 }}>
              {TOPIC_DATA.map((item, index) => {
                return (
                  <List.Item
                    key={index}
                    style={styles.contentListItem}
                    title={<Text style={styles.titleMain}>{item?.key}</Text>}
                    description={
                      <>
                        <Text style={styles.subTitle}>{item?.name}</Text>
                      </>
                    }
                    right={(props) => (
                      <TouchableOpacity
                        onPress={() => {
                          showModal(true);
                          setValueModal(item?.name as string);
                        }}
                      >
                        <IconView
                          {...props}
                          name="ios-ellipsis-vertical"
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
            <ScrollView style={{ height: 300 }}>
              {LECTURER_DATA.map((item, index) => {
                if (item?.key === '') {
                  return (
                    <>
                      <View style={styles.contentAvatr}>
                        <Image
                          source={item?.name ? { uri: item?.name } : Images.avatar}
                          style={styles.imgaAvatar}
                        />

                        <Text style={styles.title}>Mã GV: {topicInfo?.lecturer?.id}</Text>
                      </View>
                    </>
                  );
                }

                return (
                  <List.Item
                    key={index}
                    style={styles.contentListItem}
                    title={<Text style={styles.titleMain}>{item?.key}</Text>}
                    description={
                      <>
                        <Text style={styles.subTitle}>{item?.name}</Text>
                      </>
                    }
                    right={(props) => (
                      <TouchableOpacity
                        onPress={() => {
                          showModal(true);
                          setValueModal(item?.name as string);
                        }}
                      >
                        <IconView
                          {...props}
                          name="ios-ellipsis-vertical"
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

      <ModalDes visible={ismodal} title={valueModal} modalClose={showModal}></ModalDes>
    </>
  );
};
export default ItemTopic;

const styles = StyleSheet.create({
  mainTopic: {
    // height: Dimensions.get('window').height - 100,
    backgroundColor: '#fff0f3',
    borderColor: '#f08080',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: responsiveWidth(360),
    marginHorizontal: responsiveWidth(5),
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
  contentTopLevel: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: responsiveHeight(10),
    paddingLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(10),
    justifyContent: 'flex-start',
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
    fontSize: responsiveFont(18),
    color: Colors.textPrimary,
  },
  contentListItem: {},
  imgaAvatar: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    // borderRadius: 50,
    // borderColor: Colors.blueBoder,
    // borderWidth: 1,
    // shadowOpacity: 0.02,
    // position: 'absolute',
    // top: -10,
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
    fontSize: responsiveFont(16),
    color: '#277da1',
    fontWeight: '500',
    textTransform: 'uppercase',
    // paddingHorizontal: responsiveWidth(10),
  },
  vewButton_text: {
    fontSize: responsiveFont(16),
    color: '#277da1',
    fontWeight: '500',
    textTransform: 'uppercase',
    // paddingHorizontal: responsiveWidth(10),
  },
  vewButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentAvatr: {
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
