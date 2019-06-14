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
                type: 'new',
                title: 'New Movies',
              })
            }
          />
          <HorizontalList category="new" />
          <Title
            text="Trending Movies"
            textColor="#666"
            lineHeight="24px"
            textAlign="left"
            fontSize="18px"
            margin="0 0 10px"
            onPress={() =>
              navigation.navigate('Genres', {
                type: 'trending',
                title: 'Trending Movies',
              })
            }
          />
          <HorizontalList />
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
              type: 'popular',
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
