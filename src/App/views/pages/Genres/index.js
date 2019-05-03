import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Title from '../../components/Title'
import Container from '../../components/Container'
import List from '../../components/List'
import { DATA } from '../../../../data'

class Genres extends Component {
  static navigationOptions = {
    title: 'Back',
  }

  render() {
    const { navigation } = this.props
    const title = navigation.getParam('title', 'no title')
    return (
      <ScrollView>
        <Container>
          <Title
            text={title}
            textColor="#666"
            lineHeight="29px"
            textAlign="left"
            fontSize="24px"
            margin="10px"
          />
          <List item={DATA.movies} onPress={navigation} />
        </Container>
      </ScrollView>
    )
  }
}

export default Genres
