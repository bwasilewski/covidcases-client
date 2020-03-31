import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import OpenMap from '../components/OpenMap'
import axios from 'axios'

const Index = props => {
  const [center, setCenter] = useState(null)

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  
  const locationSuccess = position => {
    setCenter([position.coords.longitude, position.coords.latitude])
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`)
      .then(response => console.log('Response: ', response.data))
      .catch(error => console.error(error)) 
  }

  const locationFailure = error => console.error(error)

  const getLocation = () => navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, locationOptions)

  useEffect(() => {
    navigator.geolocation && getLocation()
  }, [])

  return (
    <Page>
      { center !== null && <OpenMap center={center} zoom={7} /> }
    </Page>
  )
}

export default Index