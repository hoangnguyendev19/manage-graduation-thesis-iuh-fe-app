import { useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../themes/Colors';
import Lottie from 'lottie-react-native';

import { Images } from '../../assets/images/Images';
import { RouteNames } from '../../utils/contants';
import tokenService from '../../services/token';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import authAPI from '../../api/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../themes/GlobalStyles';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 3000),
      );

      const token = await tokenService.getRefreshToken();
      console.log(' getRefreshToken token -> ', token);
      if (token !== null) {
        try {
          await dispatch(authAPI.getInfo()());
        } catch (error) {
          console.log('error', error);
        }
        navigation.navigate(RouteNames.TabNavigation);
      } else {
        navigation.navigate(RouteNames.LoginNavigation);
      }
    };

    checkLogin();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <StatusBar backgroundColor={'#3355f0'} />
      <View style={styles.content}>
        <Image source={Images.background_flast} style={styles.bg} />
        <Lottie
          source={require('../../assets/jsonAmination/start_screen.json')}
          autoPlay
          loop
          style={styles.logo}
        />
        <View style={styles.cotent}>
          <ActivityIndicator size={'large'} color={'#bec7ef'} />
          <Text style={styles.title}>Xin Chào!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: 200,
    height: 200,
  },
  cotent: {
    position: 'relative',
    top: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.headerColor,
  },
});
