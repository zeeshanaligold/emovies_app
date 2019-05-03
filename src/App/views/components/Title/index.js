import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.Text`
  margin: ${({ margin }) => margin && margin};
  color: ${({ textColor }) => textColor && textColor};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  text-align: ${({ textAlign }) => textAlign && textAlign};
  line-height: ${({ lineHeight }) => lineHeight && lineHeight};
`
const Title = ({ text, ...rest }) => <StyledTitle {...rest}>{text}</StyledTitle>

Title.defaultProps = {
  onPress: null,
  margin: '0px',
  textColor: '#000',
  fontSize: '16px',
  textAlign: 'left',
  lineHeight: 'normal',
}

export default Title
