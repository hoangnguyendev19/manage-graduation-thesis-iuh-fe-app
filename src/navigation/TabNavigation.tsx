import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountStackNavigator from './AccountStack';
import ResultStackNavigator from './ResultStack';
import GroupStackNavigator from './GroupStack';

import HomeStackNavigator from './HomeStack';

import { RouteNames } from '../utils/contants';
import MyTabBar from '../components/MyTabBar';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: RouteNames.HomeTab,
    component: HomeStackNavigator,
  },
  {
    name: RouteNames.GroupTab,
    component: GroupStackNavigator,
  },
  {
    name: RouteNames.ResultTab,
    component: ResultStackNavigator,
  },
  {
    name: RouteNames.AccountTab,
    component: AccountStackNavigator,
  },
];

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.HomeTab}
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {tabScreens.map((tab, index) => (
        <Tab.Screen key={tab.name} {...tab} />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
