import React, { useEffect } from 'react'
import { fromLonLat } from 'ol/proj'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

const OpenMap = props => {
  const { center, zoom } = props

  useEffect(() => {
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom
      })
    })
  })

  return <div id="map" style={{'width': '100%', 'height': '800px'}} />
}

export default OpenMap