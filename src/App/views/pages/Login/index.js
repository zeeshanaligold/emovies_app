import React, { useState } from 'react'
import { KeyboardAvoidingView, Image, Dimensions, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../../assets/styles'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { login } from '../../../redux/actions'

const { width, height } = Dimensions.get('window')

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Input = styled.TextInput`
  background-color: rgba(225, 225, 225, 0.2);
  margin-bottom: 10px;
  padding: 10px;
  color: #fff;
  width: 250px;
  height: 50px;
  border-radius: 30px;
`
const Button = styled.TouchableOpacity`
  width: 250px;
  height: 50px;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid #fff;
  background-color: transparent;
`
const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  text-align: center;
`
const Login = ({ loginToReducer }) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleClick = () => {
    if (userName === 'admin' && userPassword === 'admin') {
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
    }
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
          <Image source={require('../../../assets/images/logo.png')} style={{ margin: 50 }} />
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
