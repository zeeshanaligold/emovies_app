import React, { useReducer } from 'react'
import { withNavigation } from 'react-navigation'
import { KeyboardAvoidingView, Dimensions, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../../assets/styles'
import styled from 'styled-components'
import client from '../../../graphql/client'
import { SIGN_UP } from '../../../graphql/queries'
import { reducer, initialState } from './reducer'

const { width, height } = Dimensions.get('window')

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
const Title = styled.Text`
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
`
const SignUp = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  handleChange = (key, value) => {
    dispatch({ type: 'SET_DETAILS', payload: { [key]: value } })
  }

  const handleRegister = async () => {
    await client
      .mutate({
        mutation: SIGN_UP,
        variables: { ...state },
      })
      .then(({ data }) => {
        if (data.createUser.status === true) {
          Alert.alert('Registration Successful', '', [
            { text: 'Continue to login', onPress: () => navigation.navigate('Login') },
          ])
        }
      })
      .catch(error => {
        Alert.alert('Registration Failed', error.graphQLErrors[0].message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ])
      })
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
          <Title>Sign Up</Title>
          <Input
            value={state.firstName}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="First Name"
            keyboardType="email-address"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => handleChange('firstName', text)}
          />
          <Input
            value={state.lastName}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="Last Name"
            keyboardType="email-address"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => handleChange('lastName', text)}
          />
          <Input
            value={state.username}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="User Name"
            keyboardType="email-address"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => handleChange('username', text)}
          />
          <Input
            value={state.email}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => handleChange('email', text)}
          />
          <Input
            returnKeyType="go"
            autoCorrect={false}
            value={state.userPassword}
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={text => handleChange('password', text)}
            onSubmitEditing={() => handleRegister()}
            secureTextEntry={true}
          />
          <Button text="Register" onPress={() => handleRegister()}>
            <ButtonText>Sign Up</ButtonText>
          </Button>
        </Container>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

export default withNavigation(SignUp)
