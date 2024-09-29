import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable, Divider, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonHandle from '../../../components/ButtonHandle';
import IconView from '../../../components/IconView';
import { useAppSelector } from '../../../redux/hooks';
import Colors from '../../../themes/Colors';
import GlobalStyles from '../../../themes/GlobalStyles';
import { RouteNames } from '../../../utils/contants';
import { validateDate } from '../../../utils/handler';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { Topic } from '../../../utils/types';

interface Props {
  topicInfo?: Topic;
  handleChooseTopic(): void;
  handleCancelTopic(): void;
  groupState?: any;
}

const ItemTopic = ({ topicInfo, handleChooseTopic, handleCancelTopic, groupState }: Props) => {
  const termState = useAppSelector((state) => state.term.term);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const renderButton = useMemo(() => {
    return (
      <>
        {groupState?.info?.id ? (
          <View>
            {groupState?.info?.topic_id ? (
              <>
                {topicInfo?.id === groupState?.info?.topic_id && (
                  <ButtonHandle
                    style={{
                      backgroundColor: '#f08080',
                    }}
                    onPress={handleCancelTopic}
                    colorIcon={Colors.white}
                    iconName="close-outline"
                    title="Hủy chọn đề tài"
                  />
                )}
              </>
            ) : (
              <ButtonHandle
                onPress={handleChooseTopic}
                colorIcon={Colors.white}
                iconName="arrow-redo-outline"
                title="Chọn đề tài"
              />
            )}
          </View>
        ) : (
          <ButtonHandle
            disabled={true}
            style={styles.btn_dis}
            colorIcon={Colors.grayLight}
            iconName="arrow-redo-outline"
            title="Chọn đề tài"
          />
        )}
      </>
    );
  }, [groupState, topicInfo]);

  const handleViewDetail = () => {
    navigation.navigate(RouteNames.TopicDetail, {
      topicId: topicInfo?.id,
    });
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.mainTopic}>
        <View style={styles.content_Top}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{
                  color: 'red',
                  fontWeight: '700',
                  fontSize: responsiveFont(14),
                  textTransform: 'uppercase',
                }}
              >
                Mã đề tài: {topicInfo?.key}
              </DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>
                <View style={styles.contentTop}>
                  <Text style={styles.textValue} numberOfLines={1}>
                    Tên: {topicInfo?.name}
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
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.textValue} numberOfLines={1}>
                  GVHD: {topicInfo?.fullName}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.textValue} numberOfLines={1}>
                  Số lượng nhóm đã đăng ký: {topicInfo?.quantityGroup} /{' '}
                  {topicInfo?.quantityGroupMax}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <ButtonHandle
                  disabled={false}
                  style={styles.btnInfo}
                  colorIcon={Colors.white}
                  iconName="information-circle-outline"
                  title="Xem chi tiết"
                  onPress={handleViewDetail}
                />
              </DataTable.Cell>
            </DataTable.Row>
            {validateDate(termState?.startChooseTopicDate, termState?.endChooseTopicDate) && (
              <DataTable.Row>
                <DataTable.Cell>{renderButton}</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </View>
      </View>

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
          <Text style={{ color: '#fff', fontSize: responsiveFont(15) }}>Đóng</Text>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default ItemTopic;

const styles = StyleSheet.create({
  mainTopic: {
    backgroundColor: '#fff0f3',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: responsiveWidth(10),
    marginHorizontal: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(5),
  },
  contentTop: {
    display: 'flex',
    flexDirection: 'row',
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
  btnInfo: {
    width: '100%',
    backgroundColor: 'blue',
  },
  btn_dis: {
    backgroundColor: '#5e6e52',
    color: '#000',
  },
  textValue: {
    fontSize: responsiveFont(14),
    fontWeight: '500',
    textTransform: 'uppercase',
    width: '90%',
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
