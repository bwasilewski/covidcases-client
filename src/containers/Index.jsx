import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import GeoCard from '../components/GeoCard'
import CovidCard from '../components/CovidCard'
import { geoLocateUser, getCovidByAddress } from '../events'
import { InitMap } from '../events/maps'
import { Columns, Column } from 'bloomer'

const Index = props => {
  const [center, setCenter] = useState(null)
  const [geo, setGeo] = useState(null)
  const [covid, setCovid] = useState(null)

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  
  const locationSuccess = async position => {
    setCenter([position.coords.longitude, position.coords.latitude])
    const geoResponse = await geoLocateUser(position)
    const covidResponse = await getCovidByAddress(geoResponse.display_name)
    setGeo(geoResponse)
    setCovid(covidResponse)

    InitMap([position.coords.longitude, position.coords.latitude], 10)
  }

  const locationFailure = error => console.error(error)

  const getLocation = () => navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, locationOptions)

  useEffect(() => {
    navigator.geolocation && getLocation()
  }, [])

  return (
    <Page>
      <Columns>
        <Column isSize="3/4">
          <div id="map" style={{'width': '100%', 'height': '400px'}} />
        </Column>
        <Column>
        { geo !== null && <GeoCard title="Geography Data" data={geo} /> }
        { covid !== null && <CovidCard title="Covid Data" data={covid} /> }
        </Column>
      </Columns>
    </Page>
  )
}

export default Index