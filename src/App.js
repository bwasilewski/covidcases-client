import React from 'react'
import dotenv from 'dotenv'
import About from './containers/About'
import Index from './containers/Index'
import LostUser from './containers/LostUser'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Helmet } from 'react-helmet'

import { GeoProvider, LoadingProvider } from './contexts'

dotenv.config()
const history = createBrowserHistory()

function App() {
  return (
		<LoadingProvider>
			<GeoProvider>
				<Helmet>
					<link rel="icon" type="image/png" href="favicon.png" sizes="16x16" />
				</Helmet>
				<Router history={history}>
					<Switch>
						<Route exact path="/" component={Index} />
						<Route exact path="/about" component={About} />
						<Route component={LostUser} />
					</Switch>
					<Footer />
				</Router>
			</GeoProvider>
		</LoadingProvider>
  )
}

export default App
