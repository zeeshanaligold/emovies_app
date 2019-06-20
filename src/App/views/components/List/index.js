import React, { useReducer, useEffect, useContext } from 'react'
import { TouchableOpacity, FlatList, View, Text, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { reducer, initialState } from './reducer'
import { styles } from '../../../assets/styles'
import { GET_MOVIES } from '../../../graphql/queries'
import client from '../../../graphql/client'
import ThemeContext from '../../../Contexts'
import Frame from '../Frame'
import Title from '../Title'

const ITEM_MARGIN = 20

const List = ({ onPress, category }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { handleLoading } = useContext(ThemeContext)

  const handleLoadMore = async () => {
    const { first, skip, movies, search } = state
    dispatch({ type: 'UPDATE_STATE', payload: { isLoading: true } })

    await client
      .query({
        query: GET_MOVIES,
        variables: {
          first,
          skip,
          search,
          category,
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
        handleLoading(false)
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
        numColumns: orientation === 'LANDSCAPE' ? 3 : 2,
      },
    })
  }

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      handleLoadMore()
      handleLoading(true)
    }
    return () => (isSubscribed = false)
  }, [])

  return (
    <View style={{ flex: 1 }} onLayout={() => onLayout()}>
      <FlatList
        data={state.movies}
        key={state.numColumns}
        numColumns={state.numColumns}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={onPress}
            itemWidth={(state.screenWidth - ITEM_MARGIN * state.numColumns) / state.numColumns}
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
    </View>
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
          <Title
            textColor="#fff"
            lineHeight="22px"
            fontSize="16px"
            text={avgRating ? avgRating.toFixed(1) : 0}
          />
        </LinearGradient>
        <Text style={styles.movieListTitle}>{title}</Text>
      </Frame>
    </TouchableOpacity>
  )
}

export default List
