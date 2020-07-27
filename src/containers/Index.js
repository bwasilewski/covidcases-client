import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/Page'
import Card from '../components/Card'
import Loading from '../components/Loading'
import ZipcodeCard from '../components/ZipcodeCard'
import { geoLocateUser, getCovidByAddress, geoLocateByZip } from '../events'
import { InitMap } from '../events/maps'
import { Columns, Column, Title } from 'bloomer'
import { Helmet } from 'react-helmet'

import { GeoContext, LoadingContext } from '../contexts'

const Index = props => {
	const [geo, setGeo] = useContext(GeoContext)
	const [covid, setCovid] = useState(null)
	const [loading, setLoading] = useContext(LoadingContext)
	const [error, setError] = useState(null)
	const [noGeo, setNoGeo] = useState(false)
	const mapStyles = { width: '100%', height: '200px' }

	const handleGeo = response => {
		locationSuccess({
			coords: {
				latitude: parseFloat(response.lat),
				longitude: parseFloat(response.lon),
			},
		})
	}

	const zipcodeSubmit = ev => {
		const { target } = ev
		const { elements } = target

		ev.preventDefault()
		setLoading(true)

		geoLocateByZip(elements.namedItem('zipcode').value)
			.then(response => handleGeo(response))
			.catch(error => console.error(error))
	}

	const locationSuccess = async position => {
		setLoading(true)
		setNoGeo(false)

		const geoResponse = await geoLocateUser(position)
		const covidResponse = await getCovidByAddress(geoResponse.display_name)

		console.log(geoResponse)

		setGeo(geoResponse)
		setCovid(covidResponse)
		const { county } = covidResponse.cases
		setLoading(false)

		InitMap('map_county', 'popup_county', [position.coords.longitude, position.coords.latitude], 10)
		InitMap('map_state', 'popup_state', [position.coords.longitude, position.coords.latitude], 5)
		InitMap('map_country', 'popup_country', [position.coords.longitude, position.coords.latitude], 2)
	}

	const locationFailure = error => {
		setGeo(null)
		setNoGeo(true)
		setLoading(false)
		// TODO: need to display the error message in some way
		setError(error)
	}

	useEffect(() => {
		if (navigator.geolocation) {
			// browser is capable of geolocation
			// let's ask permission for that data
			navigator.geolocation.getCurrentPosition(
				locationSuccess,
				locationFailure,
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				}
			)
		} else {
			// browser does not support geolocation
			setNoGeo(true)
		}
	}, [])

	return (
		<Page>
			<Helmet>
				<title>covidcases.io</title>
			</Helmet>
			{noGeo === true && loading === false && (
				<Columns>
					<Column></Column>
					<Column isSize="1/3">
						<ZipcodeCard submit={zipcodeSubmit} />
					</Column>
					<Column></Column>
				</Columns>
			)}
			{loading === true && <Loading />}
			{geo && (
				<>
					<Columns>
						<Column isSize="1/3">
							<div id="map_county" style={mapStyles}>
								<div id="popup_county"></div>
							</div>
							<Card>
								<Title isSize="5">{ geo.address.county }</Title>
							</Card>
						</Column>
						<Column isSize="1/3">
							<div id="map_state" style={mapStyles}>
								<div id="popup_state"></div>
							</div>
							<Card>
								<Title isSize="5">{ geo.address.state }</Title>
							</Card>
						</Column>
						<Column isSize="1/3">
							<div id="map_country" style={mapStyles}>
								<div id="popup_country"></div>
							</div>
							<Card>
								<Title isSize="5">{ geo.address.country }</Title>
							</Card>
						</Column>
					</Columns>
				</>
			)}
		</Page>
	)
}

export default Index
