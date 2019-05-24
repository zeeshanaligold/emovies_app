import React, { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList, View, Text, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../../assets/styles'
import { GET_MOVIES } from '../../../graphql/queries'
import client from '../../../graphql/client'
import Frame from '../Image'
import Title from '../Title'

// screen sizing
const { width, height } = Dimensions.get('window')
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414
const numColumns = isSmallDevice ? 2 : 3
const ITEM_MARGIN = 20

const List = ({ onPress }) => {
  const [first, setFirst] = useState(10)
  const [skip, setSkip] = useState(0)
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  handleLoadMore = async () => {
    setIsLoading(true)

    await client
      .query({
        query: GET_MOVIES,
        variables: {
          first: first,
          skip: skip,
        },
      })
      .then(({ data }) => {
        setSkip(skip + first)
        setMovies([...movies, ...data.movies])
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    handleLoadMore()
  }, [])

  return (
    <FlatList
      numColumns={numColumns}
      data={movies}
      renderItem={({ item }) => (
        <Card
          item={item}
          onPress={onPress}
          itemWidth={(SCREEN_WIDTH - ITEM_MARGIN * numColumns) / 2}
        />
      )}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleLoadMore}
      ListFooterComponent={() => {
        return (
          isLoading && (
            <View style={{ flex: 1, padding: 10 }}>
              <ActivityIndicator size="small" />
            </View>
          )
        )
      }}
    />
  )
}

const Card = ({ item, itemWidth, onPress }) => {
  const { id, title, avgRating } = item
  return (
    <TouchableOpacity onPress={() => onPress.navigate('Details', { movieId: id })}>
      <Frame
        type="list"
        height="230px"
        width={itemWidth}
        src={{
          uri: `https://res.cloudinary.com/emovies/image/upload/v1554090936/posters/${id}.jpg`,
        }}
      >
        <LinearGradient
          style={styles.ListIconRating}
          colors={['#F99F00', '#DB3069']}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.1, y: 1 }}
        >
          <Title text={avgRating.toFixed(1)} textColor="#fff" lineHeight="22px" fontSize="16px" />
        </LinearGradient>
        <Text style={styles.movieListTitle}>{title}</Text>
      </Frame>
    </TouchableOpacity>
  )
}

export default List
