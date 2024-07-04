import React from 'react';
import { RouteNames } from '../utils/contants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteNames.HomeStack} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
