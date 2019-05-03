import React, { Component } from 'react'
import { View, ScrollView, ImageBackground, TouchableNativeFeedback } from 'react-native'
import { Container, CutomeWrapper, InnerWrapper } from './style'
import Title from '../../components/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from '../../../assets/styles'
import { DATA } from '../../../../data'
import HorizontalList from '../../components/HorizontalList'
import LinearGradient from 'react-native-linear-gradient'
import Orientation from 'react-native-orientation'

class Details extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTitle: 'Details',
    headerTintColor: '#fff',
  }

  componentWillMount() {
    Orientation.lockToPortrait()
  }

  render() {
    const { navigation } = this.props
    const movieId = navigation.getParam('movieId', 'no-id')
    const movieData = DATA.movies.filter(movie => movie.key === movieId)[0]
    return (
      <View styles={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground source={{ uri: movieData.image }} style={styles.detailHeader}>
            <LinearGradient
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0.1, y: 1 }}
              style={styles.detailHeader}
              colors={['rgba(52,92,197,0)', '#142246']}
            >
              <Container>
                <CutomeWrapper>
                  <InnerWrapper>
                    <Title
                      text={movieData.name}
                      textColor="#fff"
                      lineHeight="46px"
                      fontSize="40px"
                      textAlign="left"
                      margin="0px"
                    />
                    <Title
                      text="3,292 People wathin"
                      textColor="#fff"
                      lineHeight="24px"
                      fontSize="18px"
                      textAlign="left"
                      margin="0px"
                    />
                    <CutomeWrapper>
                      <InnerWrapper style={{ flexDirection: 'row' }}>
                        <Title
                          text="9.8"
                          textColor="yellow"
                          lineHeight="24px"
                          fontSize="18px"
                          textAlign="left"
                          margin="0px"
                        />
                        <Icon name="star" size={18} color="yellow" />
                        <Icon name="star" size={18} color="yellow" />
                        <Icon name="star" size={18} color="yellow" />
                        <Icon name="star" size={18} color="yellow" />
                        <Icon name="star-half" size={18} color="yellow" />
                      </InnerWrapper>
                      <InnerWrapper>
                        <TouchableNativeFeedback onPress={() => navigation.navigate('PlayVideo')}>
                          <LinearGradient
                            style={[
                              {
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                marginLeft: 80,
                              },
                            ]}
                            colors={['#F99F00', '#DB3069']}
                            start={{ x: 0, y: 0.1 }}
                            end={{ x: 0.1, y: 1 }}
                          >
                            <Icon name="play" size={24} color="#fff" style={styles.ButtonIcon} />
                          </LinearGradient>
                        </TouchableNativeFeedback>
                      </InnerWrapper>
                    </CutomeWrapper>
                  </InnerWrapper>
                </CutomeWrapper>
                <View />
                <Title
                  text="Fueled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne enlists the help of his newfound ally, Diana Prince, to face an even greater enemy..."
                  textColor="#fff"
                  lineHeight="28px"
                  fontSize="22px"
                  textAlign="left"
                  margin="0px"
                />
              </Container>
            </LinearGradient>
          </ImageBackground>
          <Title
            text="Related Movies"
            textColor="#666"
            lineHeight="18px"
            textAlign="left"
            fontSize="15px"
            margin="10px"
          />
          <HorizontalList item={DATA.movies} />
          <CutomeWrapper>
            <InnerWrapper style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <LinearGradient
                style={[
                  {
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginRight: 20,
                  },
                ]}
                colors={['#F99F00', '#DB3069']}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 0.1, y: 1 }}
              >
                <Icon name="thumbs-up" size={27} color="#000" style={styles.ButtonIcon} />
              </LinearGradient>
              <LinearGradient
                style={[
                  {
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginRight: 20,
                  },
                ]}
                colors={['#FECB2F', '#FECB2F']}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 0.1, y: 1 }}
              >
                <Icon name="star" size={24} color="#000" style={styles.ButtonIcon} />
              </LinearGradient>
              <TouchableNativeFeedback onPress={() => navigation.navigate('Reviews')}>
                <LinearGradient
                  style={[
                    {
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                      marginRight: 20,
                    },
                  ]}
                  colors={['#222', '#222']}
                  start={{ x: 0, y: 0.1 }}
                  end={{ x: 0.1, y: 1 }}
                >
                  <Icon name="comment" size={24} color="#000" style={styles.ButtonIcon} />
                </LinearGradient>
              </TouchableNativeFeedback>
            </InnerWrapper>
          </CutomeWrapper>
        </ScrollView>
      </View>
    )
  }
}

export default Details
