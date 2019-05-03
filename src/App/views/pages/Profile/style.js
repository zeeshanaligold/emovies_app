import React from 'react'
import styled from 'styled-components'
import Title from '../../components/Title'

export const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Frame = styled.View`
  width: 100px;
  height: 86px;
  elevation: 12;
  padding: 20px 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  shadow-opacity: 0.5;
  shadow-radius: 12px;
  shadow-color: #000000;
  shadow-offset: 8px 8px;
  background-color: #fff;
`
export const FlexItem = ({ num, text, numFontSize, numLineHeight, numColor, ...rest }) => (
  <Frame>
    <Title
      text={num}
      textColor={numColor}
      fontSize={numFontSize}
      lineHeight={numLineHeight}
      textAlign="center"
    />
    <Title text={text} {...rest} />
  </Frame>
)
