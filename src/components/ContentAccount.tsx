import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from '../assets/images/Images';
import GlobalStyles from '../themes/GlobalStyles';
import languages from '../utils/languages';
import Colors from '../themes/Colors';

import {RouteNames} from '../utils/contants';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../redux/hooks';
import { responsiveHeight, responsiveWidth } from '../utils/sizeScreen';
import TextItem from '../screens/Evaluation/components/TextItem';

const ContentAccount: React.FC<{}> = () => {
  const navigation = useNavigation();
  const userState = useAppSelector((state) => state.user.user);

  const INFO_USER = [
    { key: languages['vi'].code, name: userState?.username },
    { key: languages['vi'].name, name: userState?.name },
    { key: languages['vi'].numberPhone, name: userState?.phoneNumber },
    { key: languages['vi'].schoolYear, name: userState?.schoolYear },
    { key: languages['vi'].email, name: userState?.email },
  ];

  const renderItemView = () => {
    return (
      <>
        <View style={styles.sub}>
          {INFO_USER.map((item, index) => (
            <TextItem key={index} textLeft={item?.key} textRight={item?.name}></TextItem>
          ))}
        </View>
      </>
    );
  };
  return (
    <>
      <View style={[styles.contentInfor, GlobalStyles.borderContent, GlobalStyles.margin20]}>
        <View style={[styles.contentInfo]}>
          <View style={styles.left}>
            <Text style={styles.titleText}>{languages['vi'].info}</Text>
          </View>
          <Image
            source={userState?.avatar ? { uri: userState?.avatar } : Images.avatar}
            style={styles.imgaAvatar}
          />
          <TouchableOpacity onPress={() => navigation.navigate(RouteNames.AccountTab)}>
            <Text style={styles.textDetail}>{languages['vi'].detail}</Text>
          </TouchableOpacity>
        </View>

        {renderItemView()}
      </View>
    </>
  );
};

export default ContentAccount;

const styles = StyleSheet.create({
  contentInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentInfor: {
    height: responsiveHeight(360),
    padding: responsiveHeight(10),
    backgroundColor: Colors.white,
  },
  imgaAvatar: {
    width: responsiveWidth(65),
    height: responsiveHeight(70),
    resizeMode: 'contain',
    borderRadius: 40,
    margin: 15,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    // shadowOffset: {width: 2, height: 3},
  },
  left: {
    position: 'absolute',
    top: -25,
    backgroundColor: Colors.primary,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    alignItems: 'center',
    fontSize: 18,
    color: Colors.textPrimary,
    paddingHorizontal: 10,
  },
  sub: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  subTitle: {
    paddingVertical: responsiveWidth(9),
    fontSize: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textDetail: {
    color: Colors.primaryButton,
    textDecorationColor: Colors.drakCyonBoder,
  },
});
