import { ActivityIndicator, View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../themes/Colors';

interface Props {
  lager?: boolean;
}

const Line: React.FC<Props> = ({ lager }) => {
  return <View style={lager ? styles.contentLager : styles.content}></View>;
};

export default Line;

const styles = StyleSheet.create({
  content: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary,
  },
  contentLager: {
    height: 8,
    width: '100%',
    backgroundColor: Colors.primary,
  },
});
