import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import List from '../../components/List'
import HorizontalList from '../../components/HorizontalList'
import Title from '../../components/Title'
import Container from '../../components/Container'
import SnapCarousel from '../../components/SnapCarousel'

const Box = styled.View`
  padding: 10px;
`
const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <SnapCarousel />
      <Container>
        <Box>
          <Title
            text="New Movies"
            textColor="#666"
            lineHeight="24px"
            textAlign="left"
            fontSize="18px"
            margin="10px 0"
            onPress={() =>
              navigation.navigate('Genres', {
                category: 'new',
                title: 'New Movies',
              })
            }
          />
          <HorizontalList category="new" />
        </Box>
        <Title
          text="Popular Movies"
          textColor="#666"
          lineHeight="24px"
          textAlign="left"
          fontSize="18px"
          margin="10px"
          onPress={() =>
            navigation.navigate('Genres', {
              category: 'popular',
              title: 'Popular Movies',
            })
          }
        />
        <List onPress={navigation} />
      </Container>
    </ScrollView>
  )
}

export default Home
