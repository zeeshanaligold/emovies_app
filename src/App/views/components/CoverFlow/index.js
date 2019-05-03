import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { TabView } from 'react-native-tab-view'
import Animated from 'react-native-reanimated'
import { styles } from '../../../assets/styles'

class CoverFlow extends Component {
  static title = 'Coverflow'
  static appbarElevation = 0
  static backgroundColor = '#000'

  constructor(props) {
    super(props)
    this.state = {
      index: 2,
      /* $FlowFixMe */
      routes: Object.keys(this.props.item).map(key => ({ key })),
    }
  }

  _buildCoverFlowStyle = ({ layout, position, route }) => {
    const { width } = layout
    const { routes } = this.state
    const currentIndex = routes.indexOf(route)
    const inputRange = routes.map((x, i) => i)
    const translateOutputRange = inputRange.map(i => {
      return (width / 2) * (currentIndex - i) * -1
    })
    const scaleOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1
      } else {
        return 0.7
      }
    })
    const opacityOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1
      } else {
        return 0.3
      }
    })

    const translateX = Animated.interpolate(position, {
      inputRange,
      outputRange: translateOutputRange,
      extrapolate: 'clamp',
    })
    const scale = Animated.interpolate(position, {
      inputRange,
      outputRange: scaleOutputRange,
      extrapolate: 'clamp',
    })
    const opacity = Animated.interpolate(position, {
      inputRange,
      outputRange: opacityOutputRange,
      extrapolate: 'clamp',
    })

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    }
  }

  _handleIndexChange = index =>
    this.setState({
      index,
    })

  _renderTabBar = () => null

  _renderScene = props => (
    <Animated.View style={[styles.page, this._buildCoverFlowStyle(props)]}>
      <View style={styles.album}>
        <Image source={{ uri: this.props.item[props.route.key].image }} style={styles.cover} />
      </View>
      <Text style={styles.label}>{this.props.item[props.route.key].name}</Text>
    </Animated.View>
  )

  render() {
    return (
      <TabView
        style={[this.props.style]}
        sceneContainerStyle={styles.scene}
        navigationState={this.state}
        renderTabBar={this._renderTabBar}
        renderScene={this._renderScene}
        onIndexChange={this._handleIndexChange}
      />
    )
  }
}

export default CoverFlow
