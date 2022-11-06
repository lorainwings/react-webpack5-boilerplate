import React from 'react'

// Note: Using an Alias in Webpack
import { Header } from '@components/Header'
import { Bottom } from '@components/Bottom'

// Note: Without curly braces importing a function which use export default
import Menu from '@components/Menu'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <Bottom />
      </div>
    )
  }
}

export default App
