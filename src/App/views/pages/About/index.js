import React from 'react'
import styled from 'styled-components'
import Title from '../../components/Title'

const Container = styled.View`
  margin: 20px;
`
const Typography = styled.Text`
  color: #db3069;
  font-size: 20px;
  text-align: justify;
`
const About = () => (
  <Container>
    <Title
      fontSize="30px"
      lineHeight="30px"
      textAlign="center"
      textColor="#DB3069"
      margin="20px 0"
      text="E MOVIES"
    />
    <Typography>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </Typography>
  </Container>
)

About.navigationOptions = {
  headerTitle: 'Back',
}

export default About
