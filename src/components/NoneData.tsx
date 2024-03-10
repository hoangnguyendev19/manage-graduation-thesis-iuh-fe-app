import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconView from './IconView';
import Colors from '../themes/Colors';
import { responsiveHeight, responsiveFont, responsiveWidth } from '../utils/sizeScreen';

interface Props {
  title: string;
  icon?: boolean;
}
const NoneData: React.FC<Props> = ({ title, icon }) => {
  return (
    <View style={[styles.sectionContainer]}>
      <Text style={[styles.textView]}>{title}</Text>
      <View style={styles.viewIcon}>
        {icon && <IconView name="alert" color={'#ae2012'} size={26} />}
      </View>
    </View>
  );
};
export default NoneData;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    borderRadius: 10,
    // backgroundColor: '#eaf4f4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    textAlign: 'center',
    fontSize: responsiveFont(17),
    paddingHorizontal: responsiveWidth(5),
    color: Colors.drakCyonBoder,
    fontWeight: '400',
  },
  viewIcon: {
    // backgroundColor: '#caf0f8',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(5),
  },
});
