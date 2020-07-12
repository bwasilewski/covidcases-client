import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/Page'
import Card from '../components/Card'
import GeoCard from '../components/GeoCard'
import CovidCard from '../components/CovidCard'
import StateToggle from '../components/StateToggle'
import ZipcodeCard from '../components/ZipcodeCard'
import { geoLocateUser, getCovidByAddress, getGlobalCovidStats } from '../events'
import { InitMap } from '../events/maps'
import { Button, Columns, Column, Title } from 'bloomer'
import { Helmet } from 'react-helmet'

import { GeoContext } from '../contexts/geography'

const Index = props => {
  const [geo, setGeo] = useContext(GeoContext)
  const [covid, setCovid] = useState(null)
  const [disallowLocation, setDisallowLocation] = useState(null)
  const [viewByState, setViewByState] = useState(false)
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  
  const locationSuccess = async position => {
    const geoResponse = await geoLocateUser(position)
    const covidResponse = await getCovidByAddress(geoResponse.display_name)
    setGeo(geoResponse)
    setCovid(covidResponse)
    setDisallowLocation(false)
    const { county } = covidResponse.cases
    console.log(covidResponse)
    setDeaths(county.deaths)
    setRecovered(county.recovered)
    setConfirmed(county.confirmed)

    InitMap([position.coords.longitude, position.coords.latitude], 10)
  }

  const locationFailure = error => setGeo(null)

  const getLocation = () => navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, locationOptions)

  const handleGlobalStats = response => setGeo(response)

  const handleSwitch = checked => {
    setViewByState(checked)
    if ( checked === true ) {
      setDeaths(covid.cases.state.deaths)
      setRecovered(covid.cases.state.recovered)
      setConfirmed(covid.cases.state.confirmed)
    } else {
      setDeaths(covid.cases.county.deaths)
      setRecovered(covid.cases.county.recovered)
      setConfirmed(covid.cases.county.confirmed)
    }
  }

  useEffect(() => {
    navigator.geolocation && getLocation()
  }, [])

  return (
    <Page>
      <Helmet>
        <title>covidcases.io</title>
      </Helmet>
      { geo === null && (
        <Columns>
          <Column></Column>
          <Column isSize="1/3">
            <ZipcodeCard success={locationSuccess} />
          </Column>
          <Column></Column>
        </Columns>
      )}
      { geo && (
        <>
          <Title isSize="5">
            { geo.address.county },<br />
            { geo.address.state },<br /> 
            { geo.address.country }
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
