import React from 'react'
import styled from 'styled-components'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'

const slideWidth = 280
const horizontalMargin = 20
const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 2

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
`
const Item = styled.View`
  flex: 1;
  elevation: 24;
  height: 200px;
  shadow-radius: 16;
  shadow-color: #000;
  border-radius: 10px;
  shadow-offset: 0 12px;
  shadow-opacity: 0.58;
  width: ${itemWidth};
`
const data = [
  {
    key: 0,
    title: 'Colony',
    image: 'https://static.tvmaze.com/uploads/images/medium_portrait/91/229234.jpg',
  },
  {
    key: 1,
    title: 'The Walking Dead',
    image: 'https://static.tvmaze.com/uploads/images/medium_portrait/67/168817.jpg',
  },
  {
    key: 2,
    title: 'The 100',
    image: 'https://static.tvmaze.com/uploads/images/medium_portrait/94/236401.jpg',
  },
  {
    key: 3,
    title: 'Lethal Weapon',
    image: 'https://static.tvmaze.com/uploads/images/medium_portrait/93/234808.jpg',
  },
]

const SnapCarousel = () => (
  <Container>
    <Carousel
      data={data}
      loop={true}
      autoplay={true}
      autoplayDelay={500}
      loopClonesPerSide={2}
      itemWidth={itemWidth}
      autoplayInterval={3000}
      sliderWidth={sliderWidth}
      hasParallaxImages={true}
      renderItem={({ item }, parallaxProps) => <Card parallaxProps={parallaxProps} {...item} />}
    />
  </Container>
)

const Card = ({ image, parallaxProps }) => (
  <Item>
    <ParallaxImage
      parallaxFactor={0.4}
      style={styles.image}
      source={{ uri: image }}
      containerStyle={styles.imageContainer}
      {...parallaxProps}
    />
  </Item>
)

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: Platform.select({ ios: 0, android: 1 }),
  },
  image: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
})

export default SnapCarousel
