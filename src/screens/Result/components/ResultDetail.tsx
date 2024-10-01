// import React, { useEffect, useMemo, useState } from 'react';
// import { StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
// import { DataTable, Text } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { SceneMap, TabView } from 'react-native-tab-view';
// import Header from '../../../components/Header';
// import NoneData from '../../../components/NoneData';
// import { useAppSelector } from '../../../redux/hooks';
// import transcriptService from '../../../services/transcript';
// import Colors from '../../../themes/Colors';
// import GlobalStyles from '../../../themes/GlobalStyles';
// import { validateDate } from '../../../utils/handler';
// import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';

// const ResultDetail = () => {
//   const layout = useWindowDimensions();
//   const termState = useAppSelector((state) => state.term.term);

//   const [transcriptAdvisor, setTranscriptAdvisor] = useState(null);
//   const [transcriptReviewer, setTranscriptReviewer] = useState(null);
//   const [transcriptReport, setTranscriptReport] = useState(null);

//   useEffect(() => {
//     const getTranscriptAdvisor = async () => {
//       try {
//         const { data } = await transcriptService.getTranscriptByStudent(termState?.id, 'ADVISOR');

//         console.log('data', data);

//         setTranscriptAdvisor(data.transcript);
//       } catch (error) {
//         console.log('error', error);
//       }
//     };

//     const getTranscriptReviewer = async () => {
//       try {
//         const { data } = await transcriptService.getTranscriptByStudent(termState?.id, 'REVIEWER');
//         setTranscriptReviewer(data.transcript);
//       } catch (error) {
//         console.log('error', error);
//       }
//     };

//     const getTranscriptReport = async () => {
//       try {
//         const { data } = await transcriptService.getTranscriptByStudent(termState.id, 'REPORT');
//         setTranscriptReport(data.transcript);
//       } catch (error) {
//         console.log('error', error);
//       }
//     };

//     getTranscriptAdvisor();
//     getTranscriptReviewer();
//     getTranscriptReport();
//   }, [termState]);

//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'ADVISOR', title: 'Điểm hướng dẫn' },
//     { key: 'REVIEWER', title: 'Điểm phản biện' },
//     { key: 'REPORT', title: 'Điểm báo cáo' },
//   ]);

//   const TABADVISOR = () => {
//     return <>{advisorRender}</>;
//   };
//   const TABREVIEWER = () => {
//     return <>{reviewerRender}</>;
//   };
//   const TABREPORT = () => {
//     return <>{reportRender}</>;
//   };

//   const renderScene = SceneMap({
//     ADVISOR: TABADVISOR,
//     REVIEWER: TABREVIEWER,
//     REPORT: TABREPORT,
//   });

//   const advisorRender = useMemo(() => {
//     return (
//       <>
//         <View style={[styles.bottomContent]}>
//           <Text style={styles.title} variant="titleLarge">
//             Kết Quả GĐ Hướng Dẫn
//           </Text>
//           <DataTable>
//             {transcriptAdvisor ? (
//               <>
//                 <DataTable.Header>
//                   <DataTable.Title textStyle={styles._titleColLeft}>Tên giảng viên</DataTable.Title>
//                   <DataTable.Title textStyle={styles._titleColRight}>Điểm</DataTable.Title>
//                 </DataTable.Header>
//                 {transcriptAdvisor?.transcripts.map((item, index) => (
//                   <DataTable.Row key={index}>
//                     <DataTable.Cell>{item?.lecturerName}</DataTable.Cell>
//                     <DataTable.Cell numeric>{item?.score}</DataTable.Cell>
//                   </DataTable.Row>
//                 ))}
//                 <DataTable.Row>
//                   <DataTable.Cell>
//                     <Text variant="labelLarge" style={{ color: 'red' }}>
//                       Điểm Trung Bình
//                     </Text>
//                   </DataTable.Cell>
//                   <DataTable.Cell numeric>
//                     <Text variant="labelLarge" style={{ color: 'red' }}>
//                       {transcriptAdvisor?.avgScore}
//                     </Text>
//                   </DataTable.Cell>
//                 </DataTable.Row>
//               </>
//             ) : (
//               <Text style={styles.title_Point}>Chưa có điểm</Text>
//             )}
//           </DataTable>
//         </View>
//       </>
//     );
//   }, [transcriptAdvisor]);

//   const reviewerRender = useMemo(() => {
//     return (
//       <>
//         <View style={[styles.bottomContent]}>
//           <Text style={styles.title} variant="titleLarge">
//             Kết Quả GĐ Phản biện
//           </Text>
//           <DataTable>
//             {transcriptReviewer ? (
//               <>
//                 <DataTable.Header>
//                   <DataTable.Title textStyle={styles._titleColLeft}>Tên giảng viên</DataTable.Title>
//                   <DataTable.Title textStyle={styles._titleColRight}>Điểm</DataTable.Title>
//                 </DataTable.Header>
//                 {transcriptReviewer?.transcripts.map((item, index) => (
//                   <DataTable.Row key={index}>
//                     <DataTable.Cell>{item?.lecturerName}</DataTable.Cell>
//                     <DataTable.Cell numeric>{item?.score}</DataTable.Cell>
//                   </DataTable.Row>
//                 ))}
//                 <DataTable.Row>
//                   <DataTable.Cell>
//                     <Text variant="labelLarge" style={{ color: 'red' }}>
//                       Điểm Trung Bình
//                     </Text>
//                   </DataTable.Cell>
//                   <DataTable.Cell numeric>
//                     <Text variant="labelLarge" style={{ color: 'red' }}>
//                       {transcriptReviewer?.avgScore}
//                     </Text>
//                   </DataTable.Cell>
//                 </DataTable.Row>
//               </>
//             ) : (
//               <Text style={styles.title_Point}>Chưa có điểm</Text>
//             )}
//           </DataTable>
//         </View>
//       </>
//     );
//   }, [transcriptReviewer]);

//   const reportRender = useMemo(() => {
//     return (
//       <>
//         <View style={[styles.bottomContent]}>
//           <Text style={styles.title} variant="titleLarge">
//             Kết Quả GĐ Báo Cáo
//           </Text>
//           <DataTable>
//             {transcriptReport ? (
//               <>
//                 <DataTable.Header>
//                   <DataTable.Title textStyle={styles._titleColLeft}>Tên giảng viên</DataTable.Title>
//                   <DataTable.Title textStyle={styles._titleColRight}>Điểm</DataTable.Title>
//                 </DataTable.Header>
//                 {transcriptReport?.transcripts.map((item, index) => (
//                   <DataTable.Row key={index}>
//                     <DataTable.Cell>{item?.lecturerName}</DataTable.Cell>
//                     <DataTable.Cell numeric>{item?.score}</DataTable.Cell>
//                   </DataTable.Row>
//                 ))}
//                 <DataTable.Row>
//                   <DataTable.Cell>
//                     <Text variant="labelLarge" style={{ color: 'red' }}>
//                       Điểm Trung Bình
//                     </Text>
//                   </DataTable.Cell>
//                   <DataTable.Cell numeric>
//                     <Text variant="labelLarge" style={{ color: 'red' }}>
//                       {transcriptReport?.avgScore}
//                     </Text>
//                   </DataTable.Cell>
//                 </DataTable.Row>
//               </>
//             ) : (
//               <Text style={styles.title_Point}>Chưa có điểm</Text>
//             )}
//           </DataTable>
//         </View>
//       </>
//     );
//   }, [transcriptReport]);

//   return (
//     <SafeAreaView style={GlobalStyles.container}>
//       <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
//       <Header
//         title="Đánh giá"
//         iconLeft={true}
//         home={false}
//         style={styles.header}
//         back={true}
//       ></Header>
//       {validateDate(termState?.startPublicResultDate, termState?.endPublicResultDate) ? (
//         <TabView
//           navigationState={{ index, routes }}
//           renderScene={renderScene}
//           onIndexChange={setIndex}
//           initialLayout={{ width: layout.width }}
//         />
//       ) : (
//         <NoneData icon title="Chưa đến thời gian công bố kết quả"></NoneData>
//       )}
//     </SafeAreaView>
//   );
// };

// export default ResultDetail;

// const styles = StyleSheet.create({
//   containner: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//   },
//   header: {
//     paddingHorizontal: responsiveWidth(10),
//   },
//   titleMain: {
//     textAlign: 'center',
//     paddingHorizontal: responsiveHeight(10),
//     paddingVertical: responsiveHeight(20),

//     fontSize: responsiveFont(16),
//     color: '#d90429',
//     fontWeight: '600',
//   },
//   headerTable: {
//     flexDirection: 'column',
//   },
//   table: {
//     borderColor: Colors.blueBoder,
//     borderWidth: 1,
//   },
//   bottomContent: {
//     height: '90%',
//     width: '100%',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//     borderColor: '#caf0f8',
//     marginTop: responsiveHeight(20),
//     shadowOffset: { width: 2, height: 3 },
//   },
//   title: {
//     textAlign: 'center',
//     paddingVertical: responsiveHeight(10),
//     color: '#e29578',
//     fontWeight: '500',
//     fontSize: responsiveFont(16),
//     textTransform: 'uppercase',
//   },
//   _titleColLeft: {
//     fontSize: responsiveFont(16),
//     fontWeight: '700',
//     textTransform: 'uppercase',
//   },
//   _titleColRight: {
//     fontSize: responsiveFont(16),
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     marginLeft: 'auto',
//   },
//   title_Point: {
//     textAlign: 'center',
//     fontSize: responsiveFont(16),
//     paddingVertical: responsiveHeight(10),
//     color: '#f28482',
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     marginTop: 10,
//   },
// });
