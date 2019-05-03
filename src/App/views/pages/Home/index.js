import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Home from './Home'
import Profile from '../Profile/index'

const HomeTabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'MOVIES',
        tabBarIcon: () => {
          const { routeName } = navigation.state
          if (routeName === 'Home') {
            return (
              <Image
                source={require('../../../assets/images/movie_fill.png')}
                style={{ width: 25, height: 25 }}
              />
            )
          }
        },
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'PROFILE',
        tabBarIcon: () => {
          const { routeName } = navigation.state
          if (routeName === 'Profile') {
            return (
              <Image
                source={require('../../../assets/images/profile_fill.png')}
                style={{ width: 25, height: 25 }}
              />
            )
          }
        },
      }),
    },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

export default createAppContainer(HomeTabs)
