import React, { useEffect, useState } from 'react'
import { ScrollView, Picker } from 'react-native'
import { Button } from 'react-native-elements'
import stripe from 'tipsi-stripe'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
import Title from '../../components/Title'
import { withTheme } from '../../../Contexts'
import client from '../../../graphql/client'
import { CHARGES } from '../../../graphql/mutations'

const Container = styled.View`
  margin: 100px 50px;
`
const PickerContainer = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  margin: 20px auto 0;
  border-width: 1px;
  border-radius: 50px;
  border-color: #db3069;
`

const Subscription = ({ profile }) => {
  const [plan, setPlan] = useState('b')
  const [isPending, setStatus] = useState(false)

  const handleRequest = () => {
    setStatus(true)
    const options = {
      prefilledInformation: {
        billingAddress: {
          name: 'Gunilla Haugeh',
          email: '',
        },
      },
    }
    return stripe
      .paymentRequestWithCardForm(options)
      .then(stripeTokenInfo => {
        return handlePayment(stripeTokenInfo.tokenId)
      })
      .then(() => {
        alert('Payment succeeded!')
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setStatus(false)
      })
  }

  const handlePayment = async token => {
    await client
      .mutate({
        mutation: CHARGES,
        variables: { userId: profile.id, token, plan },
      })
      .then(({ data }) => {
        console.log(data)

        if (data.createSubscription.status === true) {
          return true
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    stripe.setOptions({
      publishableKey: 'pk_test_3LWuo8NEf8uzGHNfoMFCsBUs00tgRzzPPX',
    })
  }, [])

  return (
    <ScrollView>
      <Container>
        <Icon
          size={150}
          style={{ textAlign: 'center' }}
          color="#DB3069"
          margin={50}
          name="credit-card"
        />
        <Title
          fontSize="20px"
          lineHeight="20px"
          textAlign="center"
          textColor="#DB3069"
          margin="20px 0 0"
          text="Choose the plan that’s right for you"
        />
        <Title
          fontSize="16px"
          lineHeight="16px"
          textAlign="center"
          textColor="#DB3069"
          text="HD and Ultra HD availability subject to your Internet service and device capabilities. Not all content available in HD or Ultra HD."
        />
        <PickerContainer>
          <Picker
            style={{ height: 50 }}
            selectedValue={plan}
            onValueChange={(value, index) => setPlan(value)}
          >
            <Picker.Item label="Basic" value="b" />
            <Picker.Item label="Standard" value="s" />
            <Picker.Item label="Premium" value="p" />
          </Picker>
        </PickerContainer>
        <Button
          title="Make a payment"
          buttonStyle={{
            height: 50,
            width: '100%',
            marginTop: 20,
            borderRadius: 50,
            justifyContent: 'center',
            backgroundColor: '#DB3069',
          }}
          onPress={handleRequest}
          disabled={isPending}
        />
      </Container>
    </ScrollView>
  )
}

Subscription.navigationOptions = {
  headerTitle: 'Back',
}

export default withTheme(Subscription)
