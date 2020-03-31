import React from 'react'
import Card from './Card'
import {
  Table, 
  Title } from 'bloomer'

const GeoCard = props => {
  console.log('Geo Data: ', props.data)
  return (
    <Card title="Geography Data">
      <p>{ props.data.display_name }</p>
    </Card>
  )
}

export default GeoCard