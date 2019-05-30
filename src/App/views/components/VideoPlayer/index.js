import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation'
import YouTube from 'react-native-youtube'

class VideoPlayer extends Component {
  static navigationOptions = {
    title: 'Back',
  }
  componentWillMount() {
    Orientation.lockToLandscape()
  }
  componentWillUnmount() {
    Orientation.lockToPortrait()
  }
  render() {
    const { navigation } = this.props
    const trailer = navigation.getParam('trailer', 'no-id')
    return (
      <View style={styles.container}>
        <YouTube
          loop={true} // control whether the video should loop when ended
          play={true} // control playback of video with true/false
          fullscreen={true} // control whether the video should play in fullscreen or inline
          videoId={trailer.youtubeId} // The YouTube video ID
          apiKey="AIzaSyCcZnbyUsU-w6CvdaxdsTgyt1Moni7-3cg"
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: 300 }}
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

export default VideoPlayer
