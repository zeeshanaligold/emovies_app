import React from 'react'
import { ScrollView, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { withTheme } from '../../../Contexts'
import Title from '../../components/Title'
import { Flex, FlexItem } from './style'
import styled from 'styled-components'

const Container = styled.View`
  margin: 0 20px;
`
const Profile = ({ navigation, profile }) => {
  const { id, firstName, lastName } = profile
  return (
    <ScrollView>
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            rounded
            size="xlarge"
            showEditButton
            avatarStyle={{
              backgroundColor: '#DB3069',
            }}
            onPress={() => navigation.navigate('Edit')}
            source={{ uri: `https://i.pravatar.cc/150?u=${id}` }}
            editButton={{ onPress: () => navigation.navigate('Edit') }}
            containerStyle={{ margin: 20, borderColor: '#DB3069', borderWidth: 5 }}
          />
        </View>
        <Title
          fontSize="24px"
          textColor="#222"
          lineHeight={29}
          margin="0 0 20px"
          textAlign="center"
          text={firstName + ' ' + lastName}
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
      </Container>
    </ScrollView>
  )
}

export default withTheme(Profile)
