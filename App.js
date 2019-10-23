import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Lichthidau from './Screens/Lichthidau'
import Canhan from './Screens/canhan';
import ketqua from './Screens/ketqua';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';



const TabNavigator = createBottomTabNavigator(
  {
    Lichthidau: Lichthidau,
    Tintuc: ketqua,
    Canhan: {
      screen: Canhan,
      navigationOptions : {
        tabBarLabel: 'Cá Nhân',
        tabBarIcon: ({ tintColor }) => {
          return <Icon name='md-person' size={30} style={{ color: tintColor }} />
        }
      }
    }

  },
  {
    swipEnable: true,
    animationEnabled: true,
    tabBarOptions: {

      activeTintColor: 'darkblue',

      labelStyle: {
        fontSize: 16,
        fontWeight: '400',
        padding: 0,
      },
    }



  }
);

export default createAppContainer(TabNavigator);