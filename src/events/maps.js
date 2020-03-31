import { fromLonLat } from 'ol/proj'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'


export const InitMap = (center, zoom) => {
  document.getElementById('map').innerHTML = ''
  
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
}