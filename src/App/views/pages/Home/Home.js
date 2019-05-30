import React from 'react'
import { ScrollView } from 'react-native'
import List from '../../components/List'
import HorizontalList from '../../components/HorizontalList'
import Title from '../../components/Title'
import Container from '../../components/Container'
import { DATA } from '../../../../data'
import CoverFlow from '../../components/CoverFlow'

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <Container>
        <CoverFlow item={DATA.movies} />
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
        <HorizontalList item={DATA.movies} />
        <Title
          text="Trending Movies"
          textColor="#666"
          lineHeight="24px"
          textAlign="left"
          fontSize="18px"
          margin="10px 0"
          onPress={() =>
            navigation.navigate('Genres', {
              type: 'trending',
              title: 'Trending Movies',
            })
          }
        />
        <HorizontalList item={DATA.movies} />
        <Title
          text="Popular Movies"
          textColor="#666"
          lineHeight="24px"
          textAlign="left"
          fontSize="18px"
          margin="10px 0"
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
