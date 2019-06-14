import React, { Component, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components'
import Title from '../../components/Title'
import { ListItem, AirbnbRating, Button, Rating } from 'react-native-elements'
import { GET_REVIEWS } from '../../../graphql/queries'
import { RATE_MOVIE } from '../../../graphql/mutations'
import client from '../../../graphql/client'
import { format } from '../../../utils/format'
import { withTheme } from '../../../Contexts'
import moment from 'moment'

const Container = styled.View`
  flex: 1;
  padding: 50px 30px;
`
const StyledTextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  border-color: #f99f00;
`
const Flex = styled.View`
  flex: 1;
  align-items: ${({ align }) => (align ? align : 'flex-start')};
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  justify-content: ${({ justify }) => (justify ? justify : 'flex-start')};
`
class Reviews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      skip: 0,
      first: 10,
      rating: null,
      reviews: [],
      movieId: null,
      totalRating: 0,
      isLoading: false,
      onEndReachedCalledDuringMomentum: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Back',
      headerRight: (
        <TouchableNativeFeedback onPress={() => navigation.state.params.handleModal(true)}>
          <LinearGradient
            style={[
              {
                width: 40,
                height: 40,
                borderRadius: 40,
                marginRight: 10,
                padding: 10,
              },
            ]}
            colors={['#F99F00', '#DB3069']}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
          >
            <Icon name="star" size={20} color="#fff" />
          </LinearGradient>
        </TouchableNativeFeedback>
      ),
    }
  }

  handleModal = value => {
    this.setState({ open: value })
  }

  handleReviews = async () => {
    //this.setState({isLoading: true})
    const { first, skip, rating, movieId, reviews } = this.state
    await client
      .query({
        query: GET_REVIEWS,
        variables: {
          movieId,
          first,
          skip,
          rating,
        },
      })
      .then(({ data }) => {
        this.setState({
          skip: skip + first,
          reviews: [...reviews, ...data.reviews],
          isLoading: false,
        })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    const { navigation } = this.props
    this.setState(
      {
        movieId: navigation.getParam('movieId'),
        totalRating: navigation.getParam('totalRating'),
      },
      () => {
        this.handleReviews()
        navigation.setParams({ handleModal: () => this.handleModal(true) })
      }
    )
  }

  componentWillUnmount() {
    this.props.navigation.setParams({ handleModal: null })
  }

  render() {
    const { reviews, onEndReachedCalledDuringMomentum, totalRating, movieId } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Title
          fontSize="22px"
          textColor="#666"
          lineHeight="24px"
          text={`Reviews ( ${format(totalRating)} )`}
          textAlign="left"
          margin="10px"
        />
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem {...item} />}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          onEndReachedThreshold={0.5}
          onEndReached={x => {
            if (!onEndReachedCalledDuringMomentum) {
              this.setState(
                {
                  onEndReachedCalledDuringMomentum: true,
                },
                () => this.handleReviews()
              )
            }
          }}
          onMomentumScrollBegin={() => {
            this.setState({
              onEndReachedCalledDuringMomentum: false,
            })
          }}
        />
        <FeedBack
          movieId={movieId}
          {...this.props.profile}
          isOpen={this.state.open}
          handleModal={this.handleModal}
        />
      </View>
    )
  }
}

const ReviewItem = ({ userId, name, comment, rating, timestamp }) => (
  <ListItem
    title={
      <Flex justify="space-between">
        <Text>{name ? name : 'No Name'}</Text>
        <Rating readonly imageSize={20} startingValue={parseFloat(rating.toFixed(1))} />
      </Flex>
    }
    titleStyle={{ fontWeight: 'bold' }}
    subtitle={
      <Flex direction="column">
        <Text>{comment ? comment : 'No feedback given'}</Text>
        <Text>{moment(timestamp).fromNow()}</Text>
      </Flex>
    }
    leftAvatar={{
      size: 'large',
      source: { uri: `https://i.pravatar.cc/150?u=${userId}` },
    }}
    bottomDivider={true}
  />
)

const FeedBack = ({ isOpen, handleModal, movieId, id }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isProgress, setProgress] = useState(false)

  const handleRatingFinish = value => {
    setRating(value)
  }

  const handleSave = async () => {
    setProgress(true)
    await client
      .mutate({
        mutation: RATE_MOVIE,
        variables: { userId: id, movieId, rating, comment },
      })
      .then(({ data }) => {
        console.log(data)

        if (data.createReview.status === true) {
          setTimeout(() => {
            setProgress(false)
          }, 1000)
        }
      })
      .catch(error => {
        Alert.alert('Failed', '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
      })
    setTimeout(() => {
      setProgress(false)
    }, 1000)
  }

  return (
    <Modal visible={isOpen} transparent={false} animationType="slide">
      <ScrollView>
        <Icon
          size={50}
          color="#DB3069"
          name="times-circle"
          style={{ margin: 20 }}
          onPress={() => handleModal(false)}
        />
        <Container>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60} style={{ flex: 1 }}>
            <Title
              text="Review your experience with"
              fontSize="40px"
              textColor="#DB3069"
              lineHeight="40px"
              textAlign="center"
            />
            <Title
              fontSize="18px"
              textColor="#666"
              lineHeight="24px"
              textAlign="center"
              margin="10px 0"
              text="It will help us to improve your profile personalization"
            />
            <AirbnbRating
              size={25}
              count={5}
              defaultRating={0}
              onFinishRating={handleRatingFinish}
            />
            <StyledTextInput
              editable={true}
              maxLength={250}
              multiline={true}
              numberOfLines={5}
              autoCapitalize="none"
              textAlignVertical="top"
              placeholder="Leave a comment here"
              onChangeText={text => setComment(text)}
            />
            <Button
              title="Publish Review"
              buttonStyle={{
                height: 50,
                width: '100%',
                marginTop: 20,
                borderRadius: 50,
                justifyContent: 'center',
                backgroundColor: '#DB3069',
              }}
              onPress={() => handleSave()}
            />
            <Spinner
              style={{ marginTop: 100 }}
              color="#DB3069"
              visible={isProgress}
              textContent={'Progress...'}
              textStyle={{ color: '#DB3069' }}
            />
          </KeyboardAvoidingView>
        </Container>
      </ScrollView>
    </Modal>
  )
}

export default withTheme(Reviews)
