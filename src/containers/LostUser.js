import React from 'react'
import Page from '../components/Page'
import { Title } from 'bloomer'
import { Link } from 'react-router-dom'

const LostUser = ({history}) => {
	const handleBack = () => {
		history.goBack()
	}

	return (
		<Page>
			<Title isSize="1">404</Title>
			<p>Uh oh! Looks like you took a wrong turn.</p>
			<a onClick={handleBack}>Go Back</a>
		</Page>
	)
}

export default LostUser
