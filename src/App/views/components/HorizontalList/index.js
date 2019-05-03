import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Image, FlatList } from 'react-native'
import { styles } from '../../../assets/styles'

class HorizontalList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  renderItem(item) {
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.posterWrapper, { marginRight: 10 }]}>
          <Image
            style={{ width: 120, height: 180, borderRadius: 10 }}
            source={{ uri: item.image }}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          horizontal
          initialScrollIndex={5}
          data={this.props.item}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.key.toString()}
        />
      </View>
    )
  }
}

export default HorizontalList
