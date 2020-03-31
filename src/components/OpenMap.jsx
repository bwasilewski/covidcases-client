import React, { useEffect } from 'react'
import { InitMap } from '../events/maps'

const OpenMap = props => {
  const { center, zoom } = props

  useEffect(() => {
    // TODO: this feels so wrong
    InitMap()
  })

  return <div id="map" style={{'width': '100%', 'height': '400px'}} />
}

export default OpenMap