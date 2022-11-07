import React from 'react'

// Import of an asset usin alias in Webpack
import LOGO from '@images/persteenolsen.jpg'

class MyInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>Person Info</h2>
        <br />

        <h4>Web Developer</h4>
        <br />

        <img width="150px" src={LOGO} alt="Person Info" />

        <h4>My Blog</h4>

        <a href="https://lorainwings.github.io/blog/">
          {"Lorain's Tech Blogs"}
        </a>

        <br />
      </div>
    )
  }
}

export default MyInfo
