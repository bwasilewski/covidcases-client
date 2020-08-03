import React from 'react'
import { 
	Card, 
	CardContent,
	CardHeader,
	Column, 
	Title } from 'bloomer'

const Location = ({ styles, label }) => (
	<>
		<Column isSize="1/3">
			<div id="map_county" style={styles}>
				<div id="popup_county"></div>
			</div>
			<Card>
				<CardContent>
					<Title isSize="5">{ label }</Title>
				</CardContent>
			</Card>
		</Column>
	</>
)

export default Location
