import { StyleSheet, View } from 'react-native';
import GlobalStyles from '../../../themes/GlobalStyles';

interface Props {}

const MenuContent: React.FC<Props> = ({}) => {
  return <View style={[GlobalStyles.borderContent, styles.menu]}></View>;
};
export default MenuContent;

const styles = StyleSheet.create({
  menu: {
    height: 300,
  },
});
