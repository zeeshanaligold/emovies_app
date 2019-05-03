import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../../assets/styles'
import { Poster } from '../Image'
import Title from '../Title'

class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const _renderItem = item => {
      return (
        <View key={item.key} style={item.key % 2 == 0 ? { marginRight: 20 } : { margin: 0 }}>
          <TouchableOpacity
            onPress={() => this.props.onPress.navigate('Details', { movieId: item.key })}
          >
            <Poster width="150px" height="230px" type="list" source={{ uri: item.image }} />
          </TouchableOpacity>
          <LinearGradient
            style={styles.ListIconRating}
            colors={['#F99F00', '#DB3069']}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
          >
            <Title text="9.8" textColor="yellow" lineHeight="22px" fontSize="16px" />
          </LinearGradient>
          <Text style={styles.movieListTitle}>{this.props.name}</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <FlatList
          data={this.props.item}
          horizontal={false}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => _renderItem(item)}
          keyExtractor={item => item.key.toString()}
        />
      </View>
    )
  }
}

export class UserList extends Component {
  render() {
    const _renderItem = item => {
      return (
        <View
          key={item.key}
          style={
            item.key % 2 !== 0
              ? { marginRight: 5 }
              : Math.ceil(item.key % 3) === 0
              ? { margin: 0 }
              : { marginRight: 5 }
          }
        >
          <TouchableOpacity
            onPress={() => this.props.onPress.navigate('Details', { movieId: item.key })}
          >
            <Poster width="75px" height="113px" type="userlist" source={{ uri: item.image }} />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal={false}
          numColumns={4}
          data={this.props.item}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => _renderItem(item)}
          keyExtractor={item => item.key.toString()}
        />
      </View>
    )
  }
}

export default List
