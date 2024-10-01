import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import GlobalStyles from '../../themes/GlobalStyles';
import Colors from '../../themes/Colors';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux/hooks';
import { DataTable, Text } from 'react-native-paper';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../utils/sizeScreen';
import { useEffect, useMemo, useState } from 'react';
import { checkGender, validateDate } from '../../utils/handler';
import NoneData from '../../components/NoneData';
import { SafeAreaView } from 'react-native-safe-area-context';
import transcriptService from '../../services/transcript';

const Result: React.FC<{}> = ({}) => {
  const userState = useAppSelector((state) => state.user.user);
  const termState = useAppSelector((state) => state.term.term);
  const [transcript, setTranscript] = useState<any>({});

  useEffect(() => {
    const getTranscript = async () => {
      try {
        const { data } = await transcriptService.getTranscripts(termState?.id);

        console.log('data', data);

        if (data) setTranscript(data.transcript);
      } catch (error: any) {
        console.log('error', error.response.data.msg);
      }
    };

    getTranscript();
  }, [termState]);

  const result = [
    {
      key: 1,
      label: 'Hướng dẫn',
      grade: transcript?.advisorScore,
    },
    {
      key: 2,
      label: 'Phản Biện',
      grade: transcript?.reviewerScore,
    },
    {
      key: 3,
      label: 'Báo cáo',
      grade: transcript?.reportScore,
    },
    {
      key: 4,
      label: 'Điểm Cộng',
      grade: transcript?.totalBonusScore,
    },
    {
      key: 5,
      label: 'Điểm Trung Bình',
      grade: transcript?.totalAverageScore,
    },
  ];

  const infoUser = useMemo(() => {
    const _data = {
      name: userState?.fullName,
      gender: userState?.gender,
      phone: userState?.phone,
      email: userState?.email,
    };

    const _DATA = [
      { name: _data.name, key: 'Tên Sinh viên:' },
      { name: checkGender(_data.gender), key: 'Giới tính:' },
      { name: _data.phone, key: 'Số điện thoại:' },
      { name: _data.email, key: 'Email:' },
    ];

    return (
      <View style={styles.contentListItem}>
        {_DATA.map((i, index) => {
          return (
            <View key={index} style={styles.content}>
              <Text numberOfLines={1} style={[styles.titleMain]}>
                {i?.key}
              </Text>
              <Text numberOfLines={1} style={[styles.titleGroup]}>
                {i?.name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }, [transcript]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header title="Bảng điểm" logo iconLeft={true} home={false} iconRight={true}></Header>

      {validateDate(termState?.startPublicResultDate, termState?.endPublicResultDate) ? (
        <View style={styles.containner}>
          {infoUser}
          <Text style={styles.title_Table}>Tổng hợp điểm</Text>
          <ScrollView>
            <View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title textStyle={styles._titleCol}>Điểm thuộc gđ</DataTable.Title>
                  <DataTable.Title textStyle={styles._titleCol} numeric>
                    Điểm TB
                  </DataTable.Title>
                </DataTable.Header>

                {result.map((item, idx) => {
                  if (item.key === 4) {
                    return (
                      <DataTable.Row key={idx}>
                        <DataTable.Cell textStyle={styles._total} numeric>
                          {item.label}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles._total} numeric>
                          {item.grade !== 0 ? (
                            <Text>{item.grade}</Text>
                          ) : (
                            <Text style={styles.title_Point}>Không có</Text>
                          )}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }

                  if (item.key === 5) {
                    return (
                      <DataTable.Row key={idx}>
                        <DataTable.Cell textStyle={styles._total} numeric>
                          {item.label}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles._total} numeric>
                          {item.grade !== 0 ? (
                            <Text>{item.grade}</Text>
                          ) : (
                            <Text style={styles.title_Point}>Chưa có</Text>
                          )}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }
                  return (
                    <DataTable.Row key={idx}>
                      <DataTable.Cell textStyle={styles._grade} numeric>
                        {item.label}
                      </DataTable.Cell>
                      <DataTable.Cell textStyle={styles._grade} numeric>
                        {item.grade !== 0 ? (
                          <Text>{item.grade}</Text>
                        ) : (
                          <Text style={styles.title_Point}>Chưa có</Text>
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </View>
            {/* <View style={styles.contentStstus}>
              <Text style={styles.titleFinal}>
              {getStatusFinal(String(groupState?.status))
                ? getStatusFinal(String(groupState?.status))
                : null}
            </Text>
            </View> */}
          </ScrollView>
        </View>
      ) : (
        <NoneData icon title="Chưa đến thời gian công bố điểm!"></NoneData>
      )}
    </SafeAreaView>
  );
};
export default Result;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
  },
  cotent_Achiev: {
    marginVertical: responsiveHeight(15),
    borderColor: '#588157',
  },
  contentStstus: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleFinal: {
    color: '#e79291',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  title_Table: {
    textAlign: 'center',
    fontSize: responsiveFont(16),
    paddingVertical: responsiveHeight(10),
    color: '#f28482',
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  title_Point: {
    textAlign: 'center',
    fontSize: responsiveFont(16),
    paddingVertical: responsiveHeight(10),
    color: '#f28482',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  _titleCol: {
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _titleCol_Ar: {
    color: '#386641',
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _titleCol_NON: {
    textAlign: 'center',
    color: '#bcb8b1',
    paddingVertical: responsiveHeight(10),
    fontSize: responsiveFont(14),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  _total: {
    color: '#f28482',
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _total_Ar: {
    color: '#6a994e',
    fontSize: responsiveFont(16),
    fontWeight: '600',
  },
  _grade: {
    color: '#6b705c',
    fontSize: responsiveFont(16),
    fontWeight: '600',
  },
  contentListItem: {
    marginVertical: responsiveHeight(15),
  },
  content: {
    paddingVertical: responsiveHeight(5),
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(15),
  },
  titleMain: {
    fontSize: responsiveFont(14),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  titleGroup: {
    fontSize: responsiveFont(14),
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(14),
  },
});
