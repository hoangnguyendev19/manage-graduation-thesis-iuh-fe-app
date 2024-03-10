import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Portal } from 'react-native-paper';

import IconView from '../../../components/IconView';
import GlobalStyles from '../../../themes/GlobalStyles';

// import groupService from '../../../services/group';
// import topicService from '../../../services/topic';
import Colors from '../../../themes/Colors';
import Group from '../../../utils/types';
import Term from '../../../utils/types';
import Topic from '../../../utils/types';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { isEmpty } from '../../../utils/handler';
import ModalInfoGroup from './ModalInfoGroup';
import { useAppSelector } from '../../../redux/hooks';

interface Props {
  title?: string;
  icon?: boolean;
  onPress?: () => void;
  handleJoin?: () => void;
  join?: boolean;
  groupInfo?: Group;
  termInfoGroup?: Term;
  menberInfo?: string;
}
const GroupItem: React.FC<Props> = ({ groupInfo }) => {
  const [infoGroupItem, setInfoGroupItem] = useState<Group>();
  const [member, setMember] = useState('');
  const [topic, setTopic] = useState<Topic | null>();
  const termState = useAppSelector((state) => state.term);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    handleGetInforGroup();
    getTopicForGroup();
  }, []);

  const handleGetInforGroup = useCallback(() => {
    if (!isEmpty(groupInfo)) {
      // groupService.getGroupById(groupInfo?.id as number).then((result) => {
      //   setInfoGroupItem(result.data);
      //   setMember(result?.data?.members);
      // });
    }
  }, [infoGroupItem]);

  const getTopicForGroup = useCallback(() => {
    try {
      // topicService.getTopicId(Number(groupInfo?.topic?.id)).then((result) => {
      //   setTopic(result?.data);
      // });
    } catch (error) {}
  }, [groupInfo]);

  const topContent = useMemo(() => {
    return (
      <>
        <View style={[GlobalStyles.margin20, styles.contentTitle]}>
          <View style={styles.viewIcon}>
            <IconView name="ios-people-circle-sharp" color={Colors.iconbr} size={26} />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '90%',
            }}
          >
            <Text numberOfLines={1} style={styles.titleGroup}>
              {infoGroupItem?.name}
            </Text>

            <Text style={styles.nemberMember}>Số lượng: {member?.length} </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
            >
              <IconView name="ios-ellipsis-vertical" color={Colors.grayLight} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }, [infoGroupItem, member]);

  return (
    <>
      {topContent}

      <Portal>
        <ModalInfoGroup
          visible={visible}
          title={'Thông tin nhóm'}
          topicInfo={topic as Topic}
          termInfoGroup={termState?.term}
          infoGroup={infoGroupItem as Group}
          modalClose={setVisible}
        ></ModalInfoGroup>
      </Portal>
    </>
  );
};
export default GroupItem;

const styles = StyleSheet.create({
  contentTitle: {
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(9),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    shadowOpacity: 3,
    borderRadius: 10,
    backgroundColor: '#caf0f8',
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(10),
    shadowOffset: { width: 2, height: 3 },
  },
  viewIcon: {
    width: '10%',
    backgroundColor: '#e8e8e4',
    borderRadius: 10,
    marginRight: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(6),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    flex: 1,
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(10),
  },
  joinStyle: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
    backgroundColor: '#38b000',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  nemberMember: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
  },
  logo: {
    top: responsiveWidth(17),
  },
});
