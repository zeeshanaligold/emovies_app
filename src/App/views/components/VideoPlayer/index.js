import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation'
import VideoPlayer from 'react-native-video-controls'

class VideoPlayerView extends Component {
  static navigationOptions = {
    header: null,
  }
  componentWillMount() {
    Orientation.lockToLandscape()
  }
  back = () => {
    Orientation.lockToPortrait()
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <VideoPlayer
          source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
          title={this.props.title}
          onBack={() => this.back()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default VideoPlayerView
