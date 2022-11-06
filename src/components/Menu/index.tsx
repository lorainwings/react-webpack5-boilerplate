//import 'whatwg-fetch';

import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { Home } from '@components/Home'
import { About } from '@components/About'
import { MyInfo } from '@components/MyInfo'

import { DemoTSReact } from '@components/DemoTSReact'

import { ListPosts } from '@components/ListPosts'
import { SelectedPost } from '@components/SelectedPost'
import { EditPost } from '@components/EditPost'
import { CreatePost } from '@components/CreatePost'

import { Error } from '@components/Error'

// Import of an asset usin alias in Webpack
import webpackLogo from '@images/favicon.png'

export default function BasicRoukterExample() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/">
          <img width="50px" src={webpackLogo} alt="Webpack Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/myinfo" className="nav-item nav-link">
              Person Info
            </Link>
            <Link to="/tsdemo" className="nav-item nav-link">
              React+TypeScript
            </Link>
            <Link to="/listposts" className="nav-item nav-link">
              Web API
            </Link>
            <Link to="/error" className="nav-item nav-link">
              Secret
            </Link>
          </div>
        </div>
      </nav>

      <br />

      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/myinfo" element={<MyInfo />}></Route>

        <Route path="/tsdemo" element={<DemoTSReact />}></Route>

        <Route path="/listposts" element={<ListPosts />}></Route>

        <Route path="/selectedpost/:id" element={<SelectedPost />}></Route>

        <Route path="/editpost/:id" element={<EditPost />}></Route>

        <Route path="/createpost" element={<CreatePost />}></Route>

        <Route path="*" element={Error} />
      </Routes>
    </div>
  )
}
