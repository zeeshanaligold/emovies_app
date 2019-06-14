import React from 'react'
import styled from 'styled-components'

const BackgroundImage = styled.ImageBackground`
  display: flex;
  elevation: 12;
  padding: 10px;
  min-width: 120px;
  shadow-color: #000;
  shadow-radius: 8px;
  shadow-offset: 2px;
  border-radius: 10px;
  shadow-opacity: 0.5;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};
  margin: ${({ margins }) => (margins ? margins : '0 10px 20px')};
`

const Frame = ({ children, src, ...rest }) => (
  <BackgroundImage source={src} borderRadius={10} {...rest}>
    {children && children}
  </BackgroundImage>
)

export default Frame
