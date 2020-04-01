import React from 'react'
import dotenv from 'dotenv'
import About from './containers/About'
import Index from './containers/Index'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Helmet } from 'react-helmet'

import { GeoProvider } from './contexts'



dotenv.config()
const history = createBrowserHistory()

function App() {
  return (
    <>
      <GeoProvider>
        <Helmet>
          <link rel="icon" type="image/png" href="favicon.png" sizes="16x16" />
        </Helmet>
        <Router history={history}>
          <Header />
          <Route exact path="/" component={Index} />
          <Route exact path="/about" component={About} />
          <Footer />
        </Router>
      </GeoProvider>
    </>
  )
}

export default App
