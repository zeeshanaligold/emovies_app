import React from 'react'
import styled from 'styled-components'
import { ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { styles } from '../../../assets/styles'
import { DrawerItems, SafeAreaView } from 'react-navigation'

const Container = styled.View`
  flex: 1;
  color: #fff;
  height: 170px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const AvatarName = styled.Text`
  color: #000;
  font-size: 18px;
  text-align: left;
  font-weight: bold;
`
const DrawerHeader = ({ name, avatar }) => (
  <Container>
    <Avatar
      rounded
      size="large"
      source={avatar}
      activeOpacity={0.7}
      containerStyle={{ marginBottom: 15 }}
    />
    <AvatarName>{name}</AvatarName>
  </Container>
)

const Drawer = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerHeader name="Admin" avatar={require('../../../assets/images/default-profile.png')} />
      <DrawerItems
        activeTintColor="#2196f3"
        labelStyle={{ color: '#000' }}
        inactiveTintColor="rgba(0, 0, 0, 1)"
        inactiveBackgroundColor="transparent"
        style={{ backgroundColor: '#000000' }}
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        {...props}
      />
    </SafeAreaView>
  </ScrollView>
)

export default Drawer
