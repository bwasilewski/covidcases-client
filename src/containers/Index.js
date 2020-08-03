import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/Page'
import Card from '../components/Card'
import Loading from '../components/Loading'
import ZipcodeCard from '../components/ZipcodeCard'
import Location from '../components/Location'
import { geoLocateUser, getCovidByAddress, geoLocateByZip } from '../events'
import { InitMap } from '../events/maps'
import { Columns, Column, Title } from 'bloomer'
import { Helmet } from 'react-helmet'

import { GeoContext } from '../contexts'
import { getLocation } from '../events/locations'

const Index = props => {
	const [latLong, setLatLong] = useState(null)
	const [geo, setGeo] = useContext(GeoContext)
	const [declined, setDeclined] = useState(false)
	const [covid, setCovid] = useState(null)
	const [loading, setLoading] = useState(false)
	const [province, setProvince] = useState(null)
	const [region, setRegion] = useState(null)
	const mapStyles = { width: '100%', height: '200px' }
	const latLongOpts = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	}

	const zipSuccess = response => {
		setLatLong({
			coords: {
				latitude: parseFloat(response.lat),
				longitude: parseFloat(response.lon)
			}
		})
		setLoading(false)
	}

	const zipcodeSubmit = ev => {
		const { target } = ev
		const { elements } = target

		ev.preventDefault()
		setLoading(true)

		geoLocateByZip(elements.namedItem('zipcode').value)
			.then(response => zipSuccess(response))
			.catch(error => console.error(error))
	}

	useEffect(() => {
		console.log('render')
		const latLongSuccess = position => { setLatLong(position) }
		const latLongFailure = position => { setGeo(null) }
		const fetchLatLong = () => {
			navigator.geolocation.getCurrentPosition(
				latLongSuccess, latLongFailure, latLongOpts	
			)
		}

		const fetchGeo = async () => {
			setLoading(true)
			const geoResponse = await geoLocateUser(latLong)
			const covidResponse = await getCovidByAddress(geoResponse.display_name)
			const { address } = geoResponse		
			const stateResponse = await getLocation(address.country, address.state)
			const countryResponse = await getLocation(address.country)
			setGeo(geoResponse)
			setCovid(covidResponse)
			setProvince(stateResponse)
			setRegion(countryResponse)
			setLoading(false)
		}

		if ( latLong === null ) {
			if ( navigator.geolocation ) {
				fetchLatLong()			
			} else {
				setDeclined(true)
			}
		} else if ( latLong && geo === null ) {
			fetchGeo()	
		}

		// cleanup here
		return () => {

		}
	}, [declined, geo, latLong, latLongOpts, setGeo])

	return (
		<Page geo={geo}>
			<Helmet>
				<title>covidcases.io</title>
			</Helmet>
			{geo === null && loading === false && (
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
						<Location label={geo.address.county} styles={mapStyles} />						
						<Location label={geo.address.state} styles={mapStyles} />						
						<Location label={geo.address.country} styles={mapStyles} />						
					</Columns>
				</>
			)}
		</Page>
	)
}

export default Index
