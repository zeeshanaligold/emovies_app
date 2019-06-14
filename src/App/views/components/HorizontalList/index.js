import React, { useReducer, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { reducer, initialState } from './reducer'
import { GET_MOVIES } from '../../../graphql/queries'
import client from '../../../graphql/client'
import Frame from '../Frame'

const ITEM_MARGIN = 20

const HorizontalList = ({ onPress, category, movieId, navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleLoadMore = async () => {
    dispatch({ type: 'UPDATE_STATE', payload: { isLoading: true } })
    const { first, skip, movies, search } = state
    await client
      .query({
        query: GET_MOVIES,
        variables: {
          first,
          skip,
          search,
          category,
          movieId,
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

  const onLayout = () => {
    // screen sizing
    const { width, height } = Dimensions.get('window')
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT'

    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        screenWidth: width,
        numColumns: orientation === 'LANDSCAPE' ? 4 : 3,
      },
    })
  }

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      handleLoadMore()
    }
    return () => (isSubscribed = false)
  }, [])

  return (
    <View style={{ flex: 1 }} onLayout={() => onLayout()}>
      <FlatList
        horizontal
        data={state.movies}
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            navigation={navigation}
            item={item}
            itemWidth={(state.screenWidth - ITEM_MARGIN * state.numColumns) / state.numColumns}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const Card = ({ item, navigation, itemWidth }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movieId: item.id })}>
      <Frame
        width={itemWidth}
        height={180}
        borderRadius={10}
        margins="0 15px 0 0"
        src={{
          uri: `https://res.cloudinary.com/emovies/image/upload/v1554090936/posters/${item.id}.jpg`,
        }}
      />
    </TouchableOpacity>
  )
}

export default withNavigation(HorizontalList)
