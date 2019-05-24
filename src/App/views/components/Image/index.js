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

const Container = styled.View`
  elevation: 12;
  shadow-color: #000;
  shadow-radius: 8px;
  shadow-offset: 2px;
  border-radius: 10px;
  shadow-opacity: 0.5;
  margin: 0 10px 20px;
`

const Frame = ({ children, width, height, src }) => (
  <Container>
    <StyledImage width={width} height={height} source={src} borderRadius={10} />
    {children}
  </Container>
)

export default Frame
