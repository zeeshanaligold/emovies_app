import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Rating } from 'react-native-elements'
import { ScrollView, ImageBackground, TouchableNativeFeedback, View } from 'react-native'
import Title from '../../components/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from '../../../assets/styles'
import HorizontalList from '../../components/HorizontalList'
import LinearGradient from 'react-native-linear-gradient'
import Orientation from 'react-native-orientation'
import { Query } from 'react-apollo'
import { GET_MOVIE } from '../../../graphql/queries'
import { format } from '../../../utils/format'
import ThemeContext from '../../../Contexts'

const Container = styled.View`
  margin: 0 10px 20px;
`
const Details = ({ navigation }) => {
  const { handleLoading } = useContext(ThemeContext)
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  const movieId = navigation.getParam('movieId', 'no-id')

  return (
    <ScrollView>
      <Query
        query={GET_MOVIE}
        variables={{
          id: movieId,
        }}
      >
        {({ loading, error, data }) => {
          loading ? handleLoading(true) : handleLoading(false)
          if (error) return console.log(error)
          return (
            <View style={{ flex: 1 }}>
              <Header {...data.movie} navigation={navigation} />
              <Title
                text="Related Movies"
                textColor="#666"
                lineHeight="18px"
                textAlign="left"
                fontSize="15px"
                margin="10px"
              />
              <Container>
                <HorizontalList category="related" movieId={movieId} navigation={navigation} />
              </Container>
            </View>
          )
        }}
      </Query>
    </ScrollView>
  )
}

const Flex = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => (justify ? justify : 'flex-start')};
`
const HeaderContent = styled.View`
  flex: 1;
  margin: 100px 20px 20px;
`
const Header = ({ id, title, avgRating, totalRating, trailer, navigation }) => (
  <ImageBackground
    style={styles.detailHeader}
    source={{
      uri: `https://res.cloudinary.com/emovies/image/upload/v1554090936/posters/${id}.jpg`,
    }}
  >
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
      style={styles.detailHeader}
      colors={['rgba(52,92,197,0)', '#142246']}
    >
      <HeaderContent>
        <Title
          text={title}
          textColor="#fff"
          lineHeight="46px"
          fontSize="40px"
          textAlign="left"
          margin="0px"
        />
        <Flex>
          <Flex>
            {/* <Rating
              readonly
              imageSize={20}
              startingValue={avgRating !== null ? parseFloat(avgRating.toFixed(1)) : 0}
            /> */}
            <Title
              margin="0px"
              fontSize="18px"
              textAlign="left"
              lineHeight="24px"
              textColor="yellow"
              text={` ( ${format(totalRating)} ) `}
            />
          </Flex>
          <Flex justify="flex-end">
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('PlayVideo', { trailer: trailer })}
            >
              <LinearGradient
                style={[
                  {
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    padding: 12,
                  },
                ]}
                colors={['#F99F00', '#DB3069']}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 0.1, y: 1 }}
              >
                <Icon name="play" size={25} color="#fff" style={{ marginLeft: 5 }} />
              </LinearGradient>
            </TouchableNativeFeedback>
          </Flex>
        </Flex>
        <Title
          text="Fueled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne enlists the help of his newfound ally, enemy..."
          textColor="#fff"
          lineHeight="28px"
          fontSize="22px"
          textAlign="justify"
          margin="10px 0"
        />
        <Flex justify="center">
          <LinearGradient
            style={[
              {
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 20,
                padding: 12,
              },
            ]}
            colors={['#F99F00', '#DB3069']}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
          >
            <Icon name="thumbs-up" size={25} color="#fff" />
          </LinearGradient>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Reviews', { movieId: id, totalRating })}
          >
            <LinearGradient
              style={[
                {
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 20,
                  padding: 12,
                },
              ]}
              colors={['#FECB2F', '#FECB2F']}
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0.1, y: 1 }}
            >
              <Icon name="star" size={25} color="#fff" />
            </LinearGradient>
          </TouchableNativeFeedback>
        </Flex>
      </HeaderContent>
    </LinearGradient>
  </ImageBackground>
)

Details.navigationOptions = {
  headerTitle: 'Back',
  headerTransparent: true,
  headerTintColor: '#fff',
}

export default Details
