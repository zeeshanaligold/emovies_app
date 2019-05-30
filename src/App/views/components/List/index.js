import React, { useReducer, useEffect } from 'react'
import { TouchableOpacity, FlatList, View, Text, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { reducer, initialState } from './reducer'
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
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleLoadMore = async () => {
    dispatch({ type: 'UPDATE_STATE', payload: { isLoading: true } })
    const { first, skip, movies } = state
    await client
      .query({
        query: GET_MOVIES,
        variables: {
          first: first,
          skip: skip,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_STATE',
          payload: {
            skip: skip + first,
            movies: [...movies, ...data.movies],
            isLoading: false,
          },
        })
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      handleLoadMore()
    }
    return () => (isSubscribed = false)
  }, [])

  return (
    <FlatList
      numColumns={numColumns}
      data={state.movies}
      renderItem={({ item }) => (
        <Card
          item={item}
          onPress={onPress}
          itemWidth={(SCREEN_WIDTH - ITEM_MARGIN * numColumns) / 2}
        />
      )}
      initialNumToRender={10}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={x => {
        if (!state.onEndReachedCalledDuringMomentum) {
          handleLoadMore()
          dispatch({ type: 'UPDATE_STATE', payload: { onEndReachedCalledDuringMomentum: true } })
        }
      }}
      onMomentumScrollBegin={() => {
        dispatch({ type: 'UPDATE_STATE', payload: { onEndReachedCalledDuringMomentum: false } })
      }}
      ListFooterComponent={() => {
        return (
          state.isLoading && (
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
