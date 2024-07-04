import React from 'react';
import { StatusBar, StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import GlobalStyles from '../../../themes/GlobalStyles';
import Colors from '../../../themes/Colors';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { useAppSelector } from '../../../redux/hooks';

import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDate } from '../../../utils/handler';

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
      title: 'Ngày bắt đầu chọn nhóm',
      value: termState?.startChooseGroupDate,
    },
    {
      title: 'Ngày kết thúc chọn nhóm',
      value: termState?.endChooseGroupDate,
    },
    {
      title: 'Ngày bắt đầu chọn đề tài',
      value: termState?.startChooseTopicDate,
    },
    {
      title: 'Ngày kết thúc chọn đề tài',
      value: termState?.endChooseTopicDate,
    },
    {
      title: 'Ngày bắt đầu phản biện',
      value: termState?.startDiscussionDate,
    },
    {
      title: 'Ngày kết thúc phản biện',
      value: termState?.endDiscussionDate,
    },
    {
      title: 'Ngày bắt đầu báo cáo',
      value: termState?.startReportDate,
    },
    {
      title: 'Ngày kết thúc báo cáo',
      value: termState?.endReportDate,
    },
    {
      title: 'Ngày bắt đầu công bố kết quả',
      value: termState?.startPublicResultDate,
    },
    {
      title: 'Ngày kết thúc công bố kết quả',
      value: termState?.endPublicResultDate,
    },
  ];

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
          {INFO_TERM.map((item, index) => {
            return (
              <DataTable key={index}>
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
    // marginHorizontal: responsiveWidth(10),
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
