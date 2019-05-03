import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Image } from '../Image'
import Title from '../Title'

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    marginTop: 100,
  },
})

const slides = [
  {
    key: 'somethun',
    title: 'MAO TRAILER',
    text:
      'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    image: require('../../../assets/images/logo.png'),
    bg: '',
    colors: ['#F99F00', '#DB3069'],
  },
  {
    key: 'somethun1',
    title: 'Get the first Movie & TV information',
    text: 'Usage is all free',
    image: require('../../../assets/images/LogoGroup.png'),
    bg: require('../../../assets/images/sec_slide.jpeg'),
    colors: ['rgba(52,92,197,0)', '#142246'],
  },
  {
    key: 'somethun2',
    title: 'Know the movie is not worth Watching',
    text: 'Usage is all free',
    image: require('../../../assets/images/LogoGroup.png'),
    bg: require('../../../assets/images/third_slide.jpeg'),
    colors: ['rgba(245,213,71,0)', '#DB3069'],
  },
  {
    key: 'somethun3',
    title: 'Real-time updates movie Trailer',
    text: 'Usage is all free',
    image: require('../../../assets/images/LogoGroup.png'),
    bg: require('../../../assets/images/fourth_slide.jpeg'),
    colors: ['rgba(52,92,197,0)', '#142246'],
  },
]

class IntroSlider extends React.Component {
  _renderItem = props =>
    props.bg != '' ? (
      <ImageBackground
        source={props.bg}
        style={[styles.mainContent, { width: '100%', height: '100%' }]}
      >
        <LinearGradient
          colors={props.colors}
          style={[
            {
              width: props.width,
              height: props.height,
            },
            { flex: 1, justifyContent: 'center', alignItems: 'center' },
          ]}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.1, y: 1 }}
        >
          <Title
            fontSize="32px"
            textColor="white"
            lineHeight="38px"
            text={props.title}
            textAlign="center"
            margin="0"
          />
        </LinearGradient>
      </ImageBackground>
    ) : (
      <LinearGradient
        colors={props.colors}
        style={[
          {
            width: props.width,
            height: props.height,
          },
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }}
      >
        <Image source={props.image} width="111px" height="107px" />
        <Title
          fontSize="24px"
          textColor="white"
          lineHeight="32px"
          text={props.title}
          textAlign="center"
          margin="0"
        />
      </LinearGradient>
    )

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={() => this.props.onDone()}
        showSkipButton={true}
      />
    )
  }
}

export default IntroSlider
