import React from 'react'
import Page from '../components/Page'
import { Title } from 'bloomer'
import { Link } from 'react-router-dom'

const Page404 = ({history}) => (
  <Page>
		<Title isSize="1">404</Title>
		<p>Uh oh! Looks like you took a wrong turn.</p>
		<Link onClick={history.goBack()}>Go Back</Link>
  </Page>
)

export default Page404
