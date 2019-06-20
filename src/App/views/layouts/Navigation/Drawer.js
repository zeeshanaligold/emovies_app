import React from 'react'
import styled from 'styled-components'
import { ScrollView, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import { styles } from '../../../assets/styles'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { deleteKey } from '../../../services/deviceStorage'
import { withTheme } from '../../../Contexts'

const Container = styled.View`
  flex: 1;
  color: #fff;
  height: 170px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const AvatarName = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: left;
  font-weight: bold;
`
const List = styled.Text`
  font-size: 18px;
  padding: 15px 20px;
  ${({ active }) =>
    active &&
    `border-style: solid;
    border-left-width: 5px;
    border-left-color: #db3069;`}
`
const DrawerHeader = ({ firstName, lastName, id }) => (
  <LinearGradient style={[{ flex: 1, height: 170 }]} colors={['#F99F00', '#DB3069']}>
    <Container>
      <Avatar
        rounded
        size="large"
        activeOpacity={0.7}
        containerStyle={{ marginBottom: 15 }}
        source={{ uri: `https://i.pravatar.cc/150?u=${id}` }}
        containerStyle={{ borderColor: '#ccc', borderWidth: 5 }}
      />
      <AvatarName>{firstName + ' ' + lastName}</AvatarName>
    </Container>
  </LinearGradient>
)

const routes = [
  {
    label: ' Profile Settings',
    screen: 'Edit',
    icon: 'cogs',
  },
  {
    label: ' Subscription',
    screen: 'Subscription',
    icon: 'credit-card',
  },
  {
    label: ' About',
    screen: 'About',
    icon: 'info-circle',
  },
]

const Drawer = ({ navigation, profile }) => {
  const handleNavigate = screen => {
    navigation.navigate(screen)
  }

  const handleLogout = () => {
    deleteKey('user_token').then(() => {
      handleNavigate('SignIn')
    })
  }
  const renderRoutes = () => {
    return routes.map(({ screen, label, icon }, index) => (
      <List key={index} onPress={() => handleNavigate(screen)}>
        <Icon name={icon} size={22} />
        <Text>{label}</Text>
      </List>
    ))
  }
  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerHeader {...profile} />
        {renderRoutes()}
        <List onPress={() => handleLogout()}>
          <Icon name="sign-out" size={22} />
          <Text> Sign Out</Text>
        </List>
      </SafeAreaView>
    </ScrollView>
  )
}

export default withTheme(Drawer)
