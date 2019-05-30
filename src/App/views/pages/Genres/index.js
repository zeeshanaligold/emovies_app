import React, { Component } from 'react'
import Title from '../../components/Title'
import Container from '../../components/Container'
import List from '../../components/List'

class Genres extends Component {
  render() {
    const { navigation } = this.props
    const title = navigation.getParam('title', 'no title')
    return (
      <Container>
        <Title
          text={title}
          textColor="#666"
          lineHeight="29px"
          textAlign="left"
          fontSize="24px"
          margin="10px"
        />
        <List onPress={navigation} />
      </Container>
    )
  }
}

export default Genres
