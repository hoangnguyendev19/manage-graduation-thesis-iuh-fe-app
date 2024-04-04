import { StyleSheet } from 'react-native';
import Colors from './Colors';
import { responsiveHeight, responsiveWidth } from '../utils/sizeScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  textPrimary: {
    fontSize: 14,
    color: Colors.headerColor,
  },

  titleHeader: {
    fontSize: 20,
    color: Colors.headerColor,
    fontWeight: '500',
  },
  textError: {
    fontSize: 14,
    color: Colors.red,
    fontWeight: '400',
  },
  rememberText: {
    fontSize: 16,
    color: Colors.headerColor,
    fontStyle: 'italic',
  },

  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRadius10: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  margin20: {
    marginHorizontal: responsiveWidth(20),
    marginTop: 30,
  },
  borderContent: {
    borderRadius: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    elevation: 5,
    shadowOpacity: 0.02,
    shadowOffset: { width: 2, height: 3 },
  },
  borderTouch: {
    borderRadius: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 1,
    elevation: 1,
    shadowOffset: { width: 2, height: 2 },
  },

  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maginHorizontal20: {
    marginHorizontal: responsiveWidth(20),
  },
});
