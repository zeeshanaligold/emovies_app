import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import Home from '../../pages/Home'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import About from '../../pages/About'
import Genres from '../../pages/Genres'
import Details from '../../pages/Details'
import Contact from '../../pages/Contact'
import Reviews from '../../pages/Reviews'
import Edit from '../../pages/Profile/Edit'
import Subscription from '../../pages/Subscription'
import VideoPlayer from '../../components/VideoPlayer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from '../../../assets/styles'
import { Avatar } from 'react-native-elements'
import Drawer from './Drawer'

const SignInStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation, screenProps }) => ({
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
            size="medium"
            source={{ uri: `https://i.pravatar.cc/150?u=${screenProps.id}` }}
            containerStyle={{ marginRight: 10, borderColor: '#DB3069', borderWidth: 2 }}
          />
        ),
      }),
    },
    Genres: {
      screen: Genres,
      navigationOptions: {
        title: 'Back',
      },
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
    Subscription: {
      screen: Subscription,
    },
    Edit: {
      screen: Edit,
    },
    About: {
      screen: About,
    },
    Contact: {
      screen: Contact,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

const SignOutStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    },
  }
)

const Navigation = createDrawerNavigator(
  {
    SignInStack: {
      screen: SignInStack,
    },
    SignOutStack: {
      screen: SignOutStack,
    },
  },
  {
    contentComponent: Drawer,
    drawerBackgroundColor: '#fff',
    initialRouteName: 'SignOutStack',
  }
)

export default createAppContainer(Navigation)
