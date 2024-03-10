import { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ButtonHandle from '../../../components/ButtonHandle';

import IconView from '../../../components/IconView';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/sizeScreen';

interface Props {
  studentName?: string;
  message?: string;
  iconGroup?: string;
  recied?: boolean;
  accept?: boolean;
  onPressAccept?: () => void;
  onPressCancel?: () => void;
}
const ContentItemInvite: React.FC<Props> = ({
  studentName,
  recied,
  iconGroup,
  onPressAccept,
  onPressCancel,
  accept,
  message,
}) => {
  const topContent = useMemo(() => {
    return (
      <>
        <View
          style={[
            styles.contentTitle,
            { backgroundColor: recied ? '#f8edeb' : '#cce3de' },
            { borderColor: recied ? '#bc4749' : '#6a994e' },
          ]}
        >
          <View style={[GlobalStyles.centerView, styles.viewIcon]}>
            <IconView
              name={iconGroup ? iconGroup : 'ios-person-add'}
              color={Colors.iconbr}
              size={26}
            />
          </View>

          <View style={styles.viewCancel}>
            <View style={styles.contentText}>
              <Text numberOfLines={1} style={styles.titleGroup}>
                {studentName}
              </Text>
              <Text numberOfLines={1} style={styles.titleMessage}>
                {message ? message : 'Không có lời nhắn'}
              </Text>
            </View>
            <View style={styles.viewBtn}>
              <ButtonHandle
                style={styles.button}
                out
                icon
                iconName="ios-close-outline"
                title="Hủy"
                onPress={onPressCancel}
              />
              {accept && (
                <ButtonHandle
                  style={styles.button}
                  iconName="ios-checkmark"
                  title="Đồng ý"
                  onPress={onPressAccept}
                />
              )}
            </View>
          </View>
        </View>
      </>
    );
  }, []);

  return <>{topContent}</>;
};
export default ContentItemInvite;

const styles = StyleSheet.create({
  contentTitle: {
    paddingTop: responsiveHeight(9),
    paddingHorizontal: responsiveWidth(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    shadowOpacity: 3,
    borderRadius: 10,

    marginTop: responsiveHeight(10),
    marginHorizontal: responsiveWidth(3),
    shadowOffset: { width: 2, height: 3 },
  },
  viewIcon: {
    justifyContent: 'flex-start',
    backgroundColor: '#ffddd2',
    borderRadius: 10,
    position: 'relative',
    top: -30,
    marginRight: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    paddingTop: responsiveHeight(10),
    textTransform: 'uppercase',
  },
  titleMessage: {
    fontSize: responsiveFont(15),
    color: '#a5a58d',
    fontWeight: '400',
  },
  contentText: {
    width: '100%',
    height: responsiveHeight(50),

    justifyContent: 'center',
    flexDirection: 'column',
  },
  viewCancel: {
    width: '85%',

    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: responsiveWidth(10),
  },
});
