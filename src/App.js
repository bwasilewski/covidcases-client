import React from 'react'
import dotenv from 'dotenv'
import './App.css'
import About from './containers/About'
import Index from './containers/Index'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

dotenv.config()
const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Index} />
      <Route exact path="/about" component={About} />
    </Router>
  )
}

export default App
