import React from 'react'
import dotenv from 'dotenv'
import './App.css'
import Page from './components/Page'
import About from './containers/About'
import Index from './containers/Index'
import { Title } from 'bloomer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'


dotenv.config()
const history = createBrowserHistory()

function App() {
  return (
    <div>
      <Router history={history}>
        <Route exact path="/" component={Index} />
        <Route exact path="/about" component={About} />
      </Router>
    </div>
  )
}

export default App
