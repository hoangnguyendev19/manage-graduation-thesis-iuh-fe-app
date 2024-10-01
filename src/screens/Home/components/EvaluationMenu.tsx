import React, { useEffect, useMemo, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { DataTable, Divider, Modal, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';
import Header from '../../../components/Header';
import NoneData from '../../../components/NoneData';
import { useAppSelector } from '../../../redux/hooks';
import transcriptService from '../../../services/transcript';
import Colors from '../../../themes/Colors';
import GlobalStyles from '../../../themes/GlobalStyles';
import { validateDate } from '../../../utils/handler';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import evaluationService from '../../../services/evaluation';
import IconView from '../../../components/IconView';

const EvaluationMenu = () => {
  const layout = useWindowDimensions();
  const termState = useAppSelector((state) => state.term.term);

  const [evaluationAdvisor, setEvaluationAdvisor] = useState<any>(null);
  const [evaluationReviewer, setEvaluationReviewer] = useState<any>(null);
  const [evaluationReport, setEvaluationReport] = useState<any>(null);

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const getEvaluationsByAdvisor = async () => {
      try {
        const { data } = await evaluationService.getEvaluationsByType(termState?.id, 'ADVISOR');

        setEvaluationAdvisor(data.evaluations);
      } catch (error) {
        console.log('error', error);
      }
    };

    const getEvaluationsByReviewer = async () => {
      try {
        const { data } = await evaluationService.getEvaluationsByType(termState?.id, 'REVIEWER');

        setEvaluationReviewer(data.evaluations);
      } catch (error) {
        console.log('error', error);
      }
    };

    const getEvaluationsByReport = async () => {
      try {
        const { data } = await evaluationService.getEvaluationsByType(termState?.id, 'REPORT');

        setEvaluationReport(data.evaluations);
      } catch (error) {
        console.log('error', error);
      }
    };

    getEvaluationsByAdvisor();
    getEvaluationsByReviewer();
    getEvaluationsByReport();

    return () => {};
  }, [termState]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ADVISOR', title: 'Hướng dẫn' },
    { key: 'REVIEWER', title: 'Phản biện' },
    { key: 'REPORT', title: 'Báo cáo' },
  ]);

  const advisorRender = useMemo(() => {
    return (
      <>
        <View style={[styles.bottomContent]}>
          <Text style={styles.title} variant="titleLarge">
            Danh sách các tiêu chí
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles._titleColLeft}>Tên tiêu chí</DataTable.Title>
              <DataTable.Title textStyle={styles._titleColRight}>Điểm tối đa</DataTable.Title>
            </DataTable.Header>
            {evaluationAdvisor ? (
              evaluationAdvisor.map((item: any, index: any) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell
                    textStyle={{ width: '100%' }}
                    onPress={() => {
                      setContent(item?.name as string);
                      setVisible(true);
                    }}
                  >
                    {item?.name}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{item?.scoreMax}</DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <Text style={styles.title_Point}>Hiện chưa có tiêu chí nào.</Text>
            )}
          </DataTable>
        </View>
      </>
    );
  }, [evaluationAdvisor]);

  const reviewerRender = useMemo(() => {
    return (
      <>
        <View style={[styles.bottomContent]}>
          <Text style={styles.title} variant="titleLarge">
            Danh sách các tiêu chí
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles._titleColLeft}>Tên tiêu chí</DataTable.Title>
              <DataTable.Title textStyle={styles._titleColRight}>Điểm tối đa</DataTable.Title>
            </DataTable.Header>
            {evaluationReviewer ? (
              evaluationReviewer.map((item: any, index: any) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell
                    textStyle={{ width: '100%' }}
                    onPress={() => {
                      setContent(item?.name as string);
                      setVisible(true);
                    }}
                  >
                    {item?.name}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{item?.scoreMax}</DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <Text style={styles.title_Point}>Hiện chưa có tiêu chí đánh giá.</Text>
            )}
          </DataTable>
        </View>
      </>
    );
  }, [evaluationReviewer]);

  const reportRender = useMemo(() => {
    return (
      <>
        <View style={[styles.bottomContent]}>
          <Text style={styles.title} variant="titleLarge">
            Danh sách các tiêu chí
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles._titleColLeft}>Tên tiêu chí</DataTable.Title>
              <DataTable.Title textStyle={styles._titleColRight}>Điểm tối đa</DataTable.Title>
            </DataTable.Header>
            {evaluationReport ? (
              evaluationReport.map((item: any, index: any) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell
                    textStyle={{ width: '100%' }}
                    onPress={() => {
                      setContent(item?.name as string);
                      setVisible(true);
                    }}
                  >
                    {item?.name}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{item?.scoreMax}</DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <Text style={styles.title_Point}>Hiện chưa có tiêu chí đánh giá.</Text>
            )}
          </DataTable>
        </View>
      </>
    );
  }, [evaluationReport]);

  const TABADVISOR = () => {
    return <>{advisorRender}</>;
  };
  const TABREVIEWER = () => {
    return <>{reviewerRender}</>;
  };
  const TABREPORT = () => {
    return <>{reportRender}</>;
  };

  const renderScene = SceneMap({
    ADVISOR: TABADVISOR,
    REVIEWER: TABREVIEWER,
    REPORT: TABREPORT,
  });

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header
        title="Tiêu chí đánh giá"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
      ></Header>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: 20,
          margin: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: responsiveFont(18), textAlign: 'center' }}>
          Thông tin chi tiết
        </Text>
        <Divider />
        <Text
          style={{
            fontSize: responsiveFont(16),
            textAlign: 'center',
            marginVertical: responsiveHeight(20),
          }}
        >
          {content}
        </Text>
        <Pressable
          style={{
            backgroundColor: 'black',
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => setVisible(false)}
        >
          <Text style={{ color: '#fff', fontSize: responsiveFont(15) }}>Đóng</Text>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default EvaluationMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  titleMain: {
    textAlign: 'center',
    paddingHorizontal: responsiveHeight(10),
    paddingVertical: responsiveHeight(20),

    fontSize: responsiveFont(16),
    color: '#d90429',
    fontWeight: '600',
  },
  headerTable: {
    flexDirection: 'column',
  },
  table: {
    borderColor: Colors.blueBoder,
    borderWidth: 1,
  },
  bottomContent: {
    height: '90%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(20),
    shadowOffset: { width: 2, height: 3 },
  },
  title: {
    textAlign: 'center',
    paddingVertical: responsiveHeight(10),
    color: '#e29578',
    fontWeight: '500',
    fontSize: responsiveFont(16),
    textTransform: 'uppercase',
  },
  _titleColLeft: {
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  _titleColRight: {
    fontSize: responsiveFont(16),
    fontWeight: '700',
    textTransform: 'uppercase',
    marginLeft: 'auto',
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
});
