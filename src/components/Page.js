import React from 'react'
import Header from './Header'
import { Container, Section } from 'bloomer'

const Page = props => {
  return (
		<>
			<Header geo={props.geo} />
			<Section>
				<Container>
					{ props.children }
				</Container>
			</Section>
		</>
  )
}

export default Page
