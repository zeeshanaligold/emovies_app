import React from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.View`
  display: flex;
  height: 108px;
  justify-content: center;
  align-items: center;
`
const StyledImage = styled.Image`
  width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)};
`
export const Image = ({ source, ...rest }) => (
  <ImageWrapper>
    <StyledImage source={source} {...rest} />
  </ImageWrapper>
)

const Frame = styled.View`
  elevation: 12;
  shadow-color: #000;
  border-radius: 10px;
  shadow-opacity: 0.5;
  shadow-radius: 8px;
  shadow-offset: 2px;
`
export const Poster = props => (
  <Frame type={props.type}>
    <StyledImage
      width={props.width}
      height={props.height}
      source={props.source}
      borderRadius={10}
    />
  </Frame>
)
