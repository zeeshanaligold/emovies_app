import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import Title from '../../components/Title'
import Container from '../../components/Container'
import List from '../../components/List'

const Genres = ({ navigation }) => {
  return (
    <Container>
      <Title
        text={navigation.getParam('title', 'no title')}
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

export default withNavigation(Genres)
