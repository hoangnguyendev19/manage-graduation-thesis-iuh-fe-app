import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../utils/sizeScreen';

interface Props {
  onPress?: () => void;
  selected?: boolean;
  style?: any;
  text?: string;
  icon?: string;
  male?: boolean;
}

const GenderButton = ({ onPress, selected, male, style, text, icon }: Props) => {
  return (
    <TouchableOpacity onPress={() => !!onPress && onPress()} style={[]}>
      <Ionicons
        name={male ? 'male-sharp' : 'male-female-sharp'}
        color={selected ? Colors.rosyBrown : Colors.grayLight}
        size={18}
      />
      <Text style={[styles.text, selected && { color: Colors.rosyBrown }]}>{text}</Text>
    </TouchableOpacity>
  );
};
export default GenderButton;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(12),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: responsiveWidth(4),
  },
  text: {
    fontSize: responsiveFont(14),
    color: Colors.grayLight,
  },
});
