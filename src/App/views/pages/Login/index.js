import React, { useState } from 'react'
import { LoginManager } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAvoidingView, Image, Dimensions, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../../assets/styles'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { login } from '../../../redux/actions'
import client from '../../../graphql/client'
import { SIGN_IN } from '../../../graphql/queries'

const { width, height } = Dimensions.get('window')

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const LogoImage = styled(Image)`
  width: 120px;
  height: 120px;
  margin-bottom: 50px;
`
const Input = styled.TextInput`
  color: #fff;
  width: 300px;
  height: 50px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 50px;
  background-color: rgba(225, 225, 225, 0.2);
`

const Button = styled.TouchableOpacity`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 50px;
  border: 1px solid #fff;
  justify-content: center;
  background-color: transparent;
`
const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
`
const FacebookButton = styled(Button)`
  border: 0;
  margin-top: 20px;
  text-align: center;
  background-color: #3b5998;
`
const Login = ({ loginToReducer }) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleClick = async () => {
    await client
      .mutate({
        mutation: SIGN_IN,
        variables: { username: userName, password: userPassword },
      })
      .then(({ data }) => {
        consloe.log(data.tokenAuth.token)
      })
      .catch(error => console.log(error.graphQLErrors))

    /* if (userName === 'admin' && userPassword === 'admin') {
      loginToReducer({ userName: userName })
    } else {
      // Works on both iOS and Android
      Alert.alert(
        'Authentication Failed',
        'Please enter a valid username and password!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    } */
  }

  handleFaceBook = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log(`Login success with permissions:  ${result.grantedPermissions.toString()}`)
        }
      },
      error => {
        console.log(`Login fail with error: ${error}`)
      }
    )
  }

  return (
    <LinearGradient
      style={[
        {
          width: width,
          height: height,
        },
      ]}
      colors={['#F99F00', '#DB3069']}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Container>
          <LogoImage source={require('../../../assets/images/logo.png')} />
          <Input
            value={userName}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="User Name"
            keyboardType="email-address"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => setUserName(text)}
          />
          <Input
            returnKeyType="go"
            autoCorrect={false}
            value={userPassword}
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => setUserPassword(text)}
            onSubmitEditing={handleClick}
            secureTextEntry={true}
          />
          <Button text="Login" onPress={handleClick}>
            <ButtonText>Login</ButtonText>
          </Button>
          <FacebookButton onPress={handleFaceBook}>
            <Icon name="facebook" size={30} style={{ marginRight: 10 }} color={'white'} />
            <ButtonText>Continue with Facebook</ButtonText>
          </FacebookButton>
        </Container>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

let mapDispatchToProp = dispatch => {
  return {
    loginToReducer: user => {
      dispatch(login(user))
    },
  }
}

export default connect(
  null,
  mapDispatchToProp
)(Login)
