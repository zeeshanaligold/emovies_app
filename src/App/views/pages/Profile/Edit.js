import React, { useEffect, useReducer } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { withTheme } from '../../../Contexts'
import Title from '../../components/Title'
import styled from 'styled-components'
import client from '../../../graphql/client'
import { UPDATE_USER } from '../../../graphql/mutations'
import { reducer, initialState } from './reducer'
import Spinner from 'react-native-loading-spinner-overlay'

const Container = styled.View`
  margin: 0 50px;
`
const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-width: 1px;
  padding: 10px 20px;
  border-radius: 50px;
  border-color: #db3069;
  background-color: rgba(225, 225, 225, 0.2);
`
const EditProfile = ({ navigation, profile, handleProfile }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id, username, firstName, lastName } = profile

  handleChange = (key, value) => {
    dispatch({ type: 'SET_DETAILS', payload: { [key]: value } })
  }

  const handleSave = async () => {
    dispatch({ type: 'SET_DETAILS', payload: { isProgress: true } })
    await client
      .mutate({
        mutation: UPDATE_USER,
        variables: { ...state, id },
      })
      .then(({ data }) => {
        if (data.updateUser.status === true) {
          handleProfile()
          setTimeout(() => {
            dispatch({ type: 'SET_DETAILS', payload: { isProgress: false } })
            navigation.navigate('Profile')
          }, 1000)
        }
      })
      .catch(error => {
        Alert.alert('Failed', '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
      })
  }

  useEffect(() => {
    dispatch({ type: 'SET_DETAILS', payload: { firstName, lastName, username } })
  }, [])

  return (
    <ScrollView>
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            rounded
            size="xlarge"
            avatarStyle={{
              backgroundColor: '#DB3069',
            }}
            source={{ uri: `https://i.pravatar.cc/150?u=${id}` }}
            containerStyle={{ marginTop: 20, borderColor: '#DB3069', borderWidth: 5 }}
          />
        </View>
        <Title
          fontSize="24px"
          textColor="#222"
          lineHeight="29px"
          textAlign="center"
          margin="20px 0 0"
          text={firstName + ' ' + lastName}
        />
        <Input
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          value={state.firstName}
          placeholder="First Name"
          keyboardType="email-address"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => handleChange('firstName', text)}
        />
        <Input
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          value={state.lastName}
          placeholder="Last Name"
          keyboardType="email-address"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => handleChange('lastName', text)}
        />
        <Input
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          value={state.username}
          placeholder="Username"
          keyboardType="email-address"
          onChangeText={text => handleChange('username', text)}
        />
        <Input
          returnKeyType="go"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry={true}
          placeholder="Password"
          onSubmitEditing={() => handleSave()}
          onChangeText={text => handleChange('password', text)}
        />
        <Button
          title="Save"
          buttonStyle={{
            height: 50,
            width: '100%',
            marginTop: 20,
            borderRadius: 50,
            justifyContent: 'center',
            backgroundColor: '#DB3069',
          }}
          onPress={() => handleSave()}
        />
        <Spinner
          style={{ marginTop: 100 }}
          color="#DB3069"
          visible={state.isProgress}
          textContent={'Progress...'}
          textStyle={{ color: '#DB3069' }}
        />
      </Container>
    </ScrollView>
  )
}

EditProfile.navigationOptions = {
  headerTitle: 'Back',
}

export default withTheme(EditProfile)
