import React, { Component } from 'react'
import { View, FlatList, StyleSheet, TextInput, ScrollView } from 'react-native'
import Title from '../../components/Title'
import { ListItem, Button } from 'react-native-elements'
import Container from '../../components/Container'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    review:
      'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    review:
      'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    review:
      'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    review:
      'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    review:
      'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    review:
      'In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.',
    subtitle: 'Vice Chairman',
  },
]

class Reviews extends Component {
  constructor(props) {
    super(props)
    this.state = { text: 'Useless Placeholder' }
  }
  static navigationOptions = {
    headerTitle: 'Back',
  }
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.review}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      bottomDivider={true}
    />
  )
  render() {
    return (
      <View>
        <Title
          fontSize="22px"
          textColor="#666"
          lineHeight="24px"
          text="Reviews (293)"
          textAlign="left"
          margin="10px 0 0 0"
        />

        <ScrollView>
          <Container>
            <FlatList keyExtractor={this.keyExtractor} data={list} renderItem={this.renderItem} />
          </Container>
        </ScrollView>

        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 28,
            flexDirection: 'row',
            width: window.width,
            padding: 4,
          }}
        >
          <View style={{ flex: 4 }}>
            <TextInput
              style={styles.input}
              placeholder="Say Something..."
              placeholderTextColor="#666"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Send" buttonStyle={styles.button} titleStyle={{ color: '#000' }} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginBottom: 2,
    padding: 10,
    color: '#666',
    width: 250,
    height: 50,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    width: '100%',
  },
  button: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#fff',
  },
})

export default Reviews
