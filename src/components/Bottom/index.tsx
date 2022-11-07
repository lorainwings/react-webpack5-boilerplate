import React from 'react'
import style from './index.scss'

class Bottom extends React.Component {
  render() {
    return (
      <div className={style.text}>
        <br />A demo of a single page application made in React, TypeScript,
        PostCSS and Bootstrap
      </div>
    )
  }
}

export { Bottom }
