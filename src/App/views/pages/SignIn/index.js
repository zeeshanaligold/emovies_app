import React, { useState, useEffect, useContext } from 'react'
import { withNavigation } from 'react-navigation'
import { LoginManager } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAvoidingView, Image, Dimensions, Alert, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../../assets/styles'
import styled from 'styled-components'
import client from '../../../graphql/client'
import { SIGN_IN } from '../../../graphql/mutations'
import { withTheme } from '../../../Contexts'
import { saveKey, getKey } from '../../../services/deviceStorage'

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
const StyledText = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-top: 20px;
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
const SignIn = ({ navigation, handleProfile, setProgress }) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleClick = async () => {
    setProgress(true)
    await client
      .mutate({
        mutation: SIGN_IN,
        variables: { username: userName, password: userPassword },
      })
      .then(({ data }) => {
        saveKey('user_token', data.tokenAuth.token)
        navigation.navigate('Home')
        handleProfile()
      })
      .catch(error => {
        Alert.alert('Authentication Failed', error.graphQLErrors[0].message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ])
      })
    setProgress(false)
  }

  handleFaceBook = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log(result)
          console.log(`Login success with permissions:  ${result.grantedPermissions.toString()}`)
        }
      },
      error => {
        console.log(`Login fail with error: ${error}`)
      }
    )
  }

  useEffect(() => {
    getKey('user_token').then(value => {
      if (value !== null) {
        navigation.navigate('Home')
      }
    })
  }, [])

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
            onSubmitEditing={() => handleClick()}
            secureTextEntry={true}
          />
          <Button text="Sign In" onPress={() => handleClick()}>
            <ButtonText>Sign In</ButtonText>
          </Button>
          <FacebookButton onPress={() => handleFaceBook()}>
            <Icon name="facebook" size={30} style={{ marginRight: 10 }} color={'white'} />
            <ButtonText>Continue with Facebook</ButtonText>
          </FacebookButton>
          <StyledText>
            {`Don't have an account? `}
            <Text onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
          </StyledText>
        </Container>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

export default withTheme(withNavigation(SignIn))
