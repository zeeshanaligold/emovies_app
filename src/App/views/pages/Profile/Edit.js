import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import Container from '../../components/Container'
import Title from '../../components/Title'

class EditProfile extends Component {
  static navigationOptions = {
    headerTitle: 'Profile Setting',
  }
  render() {
    return (
      <Container>
        <ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              rounded
              size="xlarge"
              activeOpacity={0.7}
              showEditButton
              containerStyle={{ marginTop: 10 }}
              editButton={{
                name: 'mode-edit',
                type: 'material',
                color: '#fff',
                underlayColor: '#000',
              }}
              onPress={() => alert('EditProfile')}
              source={require('../../../assets/images/default-profile.png')}
            />
          </View>
          <Title
            text="Admin"
            textColor="#222"
            lineHeight="29px"
            textAlign="center"
            fontSize="24px"
            margin="10px"
          />
        </ScrollView>
      </Container>
    )
  }
}

export default EditProfile
