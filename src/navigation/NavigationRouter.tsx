import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import TabNavigation from './TabNavigation';
import SplashScreen from '../screens/Splash/Splash';
import TermMenu from '../screens/Home/components/TermMenu';
import TopicMenu from '../screens/Home/components/TopicMenu';
import TopicDetail from '../components/TopicDetail';
import EvaluationMenu from '../screens/Home/components/EvaluationMenu';

import ItemGroup from '../screens/Group/components/ItemGroup';
import ItemListGroup from '../screens/Group/components/ItemListGroup';
import Notification from '../screens/Home/components/Notification';
import DisAcceptedUser from '../screens/Login/components/NotificationLogin';
import ChangePassword from '../screens/Account/components/ChangePassword';

const Stack = createNativeStackNavigator();

const NavigationRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: 'SplashScreen' }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name={'TabNavigation'} component={TabNavigation} />

        <Stack.Screen name={'TermMenu'} component={TermMenu} />
        <Stack.Screen name={'TopicMenu'} component={TopicMenu} />
        <Stack.Screen name={'EvaluationMenu'} component={EvaluationMenu} />

        <Stack.Screen name={'ItemListGroup'} component={ItemListGroup} />
        <Stack.Screen name={'ItemGroup'} component={ItemGroup} />
        <Stack.Screen name={'TopicDetail'} component={TopicDetail} />
        <Stack.Screen name={'Notification'} component={Notification} />
        <Stack.Screen name={'DisAcceptedUser'} component={DisAcceptedUser} />
        <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationRouter;
