import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

const ThemeContext = React.createContext({})

export const withTheme = Component => {
  const Enhance = props => {
    return (
      <ThemeContext.Consumer>
        {contexts => <Component {...props} {...contexts} />}
      </ThemeContext.Consumer>
    )
  }
  hoistNonReactStatic(Enhance, Component)
  return Enhance
}

export const Provider = ThemeContext.Provider
export const Consumer = ThemeContext.Consumer
export default ThemeContext
