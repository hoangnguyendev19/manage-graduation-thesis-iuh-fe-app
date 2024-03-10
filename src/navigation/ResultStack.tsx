import React from 'react';
import { RouteNames } from '../utils/contants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Result from '../screens/Result/Result';

const Stack = createNativeStackNavigator();

const ResultStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteNames.ResultStack} component={Result} />
    </Stack.Navigator>
  );
};

export default ResultStackNavigator;
