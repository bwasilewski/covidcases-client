import React, { useContext } from 'react'
import Card from './Card'
import {
  Button,
  Field,
  Label,
  Control,
  Input } from 'bloomer'
import { GeoContext } from '../contexts/geography'
import { geoLocateByZip } from '../events'

const ZipcodeCard = props => {
  const handleGeo = response => {
    props.success({
      coords: {
        latitude: parseFloat(response.lat),
        longitude: parseFloat(response.lon)
      }
    })
  }

  const handleSubmit = ev => {
    const { target } = ev
    const { elements } = target
    
    ev.preventDefault()

    geoLocateByZip(elements.namedItem('zipcode').value)
      .then(response => handleGeo(response))
      .catch(error => console.error(error))
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="zipcode">Please enter your zipcode</Label>
          <Control>
            <Input type="text" name="zipcode" />
          </Control>
        </Field>
        <Field>
          <Control>
            <button type="submit" className="button is-primary">Submit</button>
          </Control>
        </Field>
      </form>
    </Card>
  )
}

export default ZipcodeCard