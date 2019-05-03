import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import About from '../../pages/About'
import Genres from '../../pages/Genres'
import Details from '../../pages/Details'
import Contact from '../../pages/Contact'
import Reviews from '../../pages/Reviews'
import Edit from '../../pages/Profile/Edit'
import VideoPlayer from '../../components/VideoPlayer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from '../../../assets/styles'
import { Avatar } from 'react-native-elements'
import Drawer from './Drawer'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Icon
          size={30}
          name="bars"
          style={styles.navigatBar}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerRight: (
        <Avatar
          rounded
          size="small"
          activeOpacity={0.9}
          containerStyle={{ marginRight: 10 }}
          source={require('../../../assets/images/default-profile.png')}
        />
      ),
    }),
  },
  Genres: {
    screen: Genres,
  },
  Details: {
    screen: Details,
  },
  Reviews: {
    screen: Reviews,
  },
  PlayVideo: {
    screen: VideoPlayer,
  },
  Edit: {
    screen: Edit,
  },
  Login: {
    screen: Login,
  },
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="bars" size={24} onPress={() => navigation.toggleDrawer()} />,
      headerRight: <Icon name="user-circle" size={24} />,
    }),
  },
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Icon name="user-circle" size={24} />,
      headerLeft: <Icon name="bars" size={24} onPress={() => navigation.toggleDrawer()} />,
    }),
  },
})

const Navigation = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} size={22} />,
      },
    },
    Setting: {
      screen: Edit,
      navigationOptions: {
        title: 'Profile Settings',
        drawerLabel: 'Profile Settings',
        drawerIcon: ({ tintColor }) => <Icon name="cogs" color={tintColor} size={22} />,
      },
    },
    Logout: {
      screen: Login,
      navigationOptions: {
        title: 'Logout',
        drawerLabel: 'Logout',
        drawerIcon: ({ tintColor }) => <Icon name="sign-out" color={tintColor} size={22} />,
      },
    },
  },
  {
    drawerBackgroundColor: '#fff',
    contentComponent: Drawer,
  }
)

export default createAppContainer(Navigation)
