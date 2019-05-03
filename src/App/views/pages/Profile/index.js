import React from 'react'
import { ScrollView, View } from 'react-native'
import Container from '../../components/Container'
import { Flex, FlexItem } from './style'
import Title from '../../components/Title'
import { Avatar } from 'react-native-elements'
import { DATA } from '../../../../data'
import { UserList } from '../../components/List'

const Profile = ({ navigation }) => {
  return (
    <ScrollView>
      <Container>
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
            source={require('../../../assets/images/default-profile.png')}
            onPress={() => navigation.navigate('Edit')}
          />
        </View>
        <Title
          text="Admin"
          textColor="#222"
          lineHeight={29}
          textAlign="center"
          fontSize="24px"
          margin="10px"
        />
        <Flex>
          <FlexItem
            num="3210"
            numFontSize="30px"
            numLineHeight={34}
            numColor="#E24951"
            text="Like"
            textColor="#666"
            lineHeight={22}
            textAlign="center"
          />
          <FlexItem
            num="1232"
            numFontSize="30px"
            numLineHeight={34}
            numColor="#666"
            text="Watching"
            textColor="#666"
            lineHeight={22}
            textAlign="center"
          />
          <FlexItem
            num="44"
            numFontSize="30px"
            numLineHeight={34}
            numColor="#666"
            text="Comments"
            textColor="#666"
            lineHeight={22}
            textAlign="center"
          />
        </Flex>
        <UserList item={DATA.movies} onPress={navigation} />
      </Container>
    </ScrollView>
  )
}

export default Profile
