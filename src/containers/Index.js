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
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)
 
  const handleGeo = response => {
    locationSuccess({
      coords: {
        latitude: parseFloat(response.lat),
        longitude: parseFloat(response.lon)
      }
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
    
		setGeo(geoResponse)
    setCovid(covidResponse)
		const { county } = covidResponse.cases
    setDeaths(county.deaths)
    setRecovered(county.recovered)
    setConfirmed(county.confirmed)
    setLoading(false)

    InitMap([position.coords.longitude, position.coords.latitude], 10)
  }

  const locationFailure = error => { 
    setGeo(null)
    setNoGeo(true)
    setLoading(false)
		// TODO: need to display the error message in some way 
		setError(error)
  }

  useEffect(() => {
    if ( navigator.geolocation ) {
      // browser is capable of geolocation
      // let's ask permission for that data
      navigator.geolocation.getCurrentPosition(
        locationSuccess, 
        locationFailure, 
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
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
      { noGeo === true && loading === false && (
        <Columns>
          <Column></Column>
          <Column isSize="1/3">
            <ZipcodeCard submit={zipcodeSubmit} />
          </Column>
          <Column></Column>
        </Columns>
      )}
      { loading === true && <Loading /> }
      { geo && (
        <>
          <Title isSize="5">
						county: { geo.address.county }, state: { geo.address.state }
          </Title>
          {/* <StateToggle onChange={handleSwitch} checked={viewByState} /> */}
          <Columns>
            <Column isSize="1/2">
              <div id="map" style={{'width': '100%', 'height': '600px'}}><div id="popup"></div></div>
            </Column>
            <Column hasTextAlign="centered">
              <Card>
                Cases: { confirmed }
              </Card>
            </Column>
            <Column hasTextAlign="centered">
              <Card>Deaths: { deaths }</Card>
            </Column>
            { recovered > 0 && (
              <Column hasTextAlign="centered">
                <Card>Recovered: { recovered }</Card>
              </Column>
            )}
          </Columns>
        </>
      )}
    </Page>
  )
}

export default Index
