import React from 'react';
import { StatusBar, StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppSelector } from '../../../redux/hooks';

import moment from 'moment';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermMenu = () => {
  const termState = useAppSelector((state) => state.term.term);

  const START_END = [
    {
      title: 'Tên học kỳ',
      value: termState?.name,
    },
    {
      title: 'Ngày bắt đầu',
      value: termState?.startDate,
    },
    {
      title: 'Ngày kết thúc',
      value: termState?.endDate,
    },
  ];

  const INFO_TERM = [
    {
      title: 'Ngày bắt đầu chọn đề tài',
      value: termState?.startDateChooseTopic,
    },
    {
      title: 'Ngày kết thúc chọn đề tài',
      value: termState?.endDateChooseTopic,
    },
    {
      title: 'Ngày bắt đầu đề tài',
      value: termState?.startDateSubmitTopic,
    },
    {
      title: 'Ngày kết thúc đề tài',
      value: termState?.endDateSubmitTopic,
    },
    {
      title: 'Khoản thời gian bắt đầu phản biện',
      value: termState?.startDateDiscussion,
    },
    {
      title: 'Khoản thời gian kết thúc phản biện',
      value: termState?.endDateDiscussion,
    },
    {
      title: 'Ngày phản biện',
      value: termState?.dateDiscussion,
    },
    {
      title: 'Khoản thời gian bắt đầu báo cáo',
      value: termState?.startDateReport,
    },
    {
      title: 'Khoản thời gian kết thúc báo cáo',
      value: termState?.endDateReport,
    },
    {
      title: 'Ngày báo cáo hội đồng',
      value: termState?.dateReport,
    },
  ];

  const formatDate = (date: string) => {
    return moment(date).locale('vi').format('dddd, DD/MM/YYYY, h:mm:ss A');
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header
        title="Học kỳ"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={true}
      ></Header>

      <View style={styles.containner_Top}>
        {START_END.map((item, key) => {
          if (item?.title === 'Tên học kỳ') {
            return (
              <View key={key} style={[styles.contentTitle, GlobalStyles.centerView]}>
                <Text numberOfLines={1} style={[styles.titleGroup]}>
                  {item?.title}
                </Text>
                <Text numberOfLines={1} style={[styles.titleGroup, styles.title]}>
                  {item?.value}
                </Text>
              </View>
            );
          }
          return (
            <DataTable key={key}>
              <DataTable.Header>
                <DataTable.Title
                  textStyle={[styles.title_Group, { color: 'red', fontWeight: '700' }]}
                >
                  {item?.title}
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell textStyle={styles.textValue}>
                  {formatDate(item?.value)}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          );
        })}
      </View>

      <View style={styles.containner}>
        <ScrollView>
          {INFO_TERM.map((item) => {
            return (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title textStyle={styles.title_Group}>{item?.title}</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell textStyle={styles.textValue}>
                    {formatDate(item?.value)}
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TermMenu;

const styles = StyleSheet.create({
  containner_Top: {
    width: '100%',
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,

    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,

    borderColor: '#aed9e0',
  },
  containner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: Colors.white,
    // borderColor: '#aed9e0',
    // borderWidth: 1,
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(16),
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  titleGroup: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  title_Group: {
    fontSize: responsiveFont(16),
    color: '#003049',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  textValue: {
    fontSize: responsiveFont(16),
    color: '#277da1',
    fontWeight: '500',
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(10),
    marginHorizontal: responsiveWidth(10),
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: responsiveHeight(10),
  },

  title: {
    marginHorizontal: responsiveWidth(10),
  },
  contentTitle: {
    marginTop: responsiveHeight(10),
    backgroundColor: '#aed9e0',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: '#003049',
    paddingVertical: responsiveHeight(10),
  },
});
