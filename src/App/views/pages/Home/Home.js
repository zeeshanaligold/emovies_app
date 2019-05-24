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
        <Title
          text="MOVIES"
          textColor="#666"
          lineHeight="24px"
          textAlign="left"
          fontSize="18px"
          margin="10px 0"
          onPress={() =>
            navigation.navigate('Genres', {
              genre: 'movies',
              title: 'All movies list',
            })
          }
        />
        <CoverFlow item={DATA.movies} />
        <Title
          text="New"
          textColor="#666"
          lineHeight="24px"
          textAlign="left"
          fontSize="18px"
          margin="10px 0"
          onPress={() =>
            navigation.navigate('Genres', {
              genre: 'movies',
              title: 'All movies list',
            })
          }
        />
        <HorizontalList item={DATA.movies} />
        <Title
          text="Popular"
          textColor="#666"
          lineHeight="24px"
          textAlign="left"
          fontSize="18px"
          margin="10px 0"
          onPress={() =>
            navigation.navigate('Genres', {
              genre: 'movies',
              title: 'All movies list',
            })
          }
        />
        <List onPress={navigation} />
      </Container>
    </ScrollView>
  )
}

export default Home
