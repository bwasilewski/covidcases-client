import { fromLonLat } from 'ol/proj'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import Overlay from 'ol/Overlay'


export const InitMap = (center, zoom) => {
  document.getElementById('map').innerHTML = ''

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(center)),
    name: 'Null Island',
    fart: true,
    gay: false
  })

  const iconStyle = new Style({
    image: new Icon({
      // anchorXUnits: 'fraction',
      // anchorYUnits: 'pixels',
      src: 'favicon.png',
      size: [160, 160],
      scale: .25
    })
  })

  const popup = new Overlay({
    element: document.getElementById('popup'),
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50]
  })

  iconFeature.setStyle(iconStyle)
  
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [iconFeature]
        })
      }),
    ],
    view: new View({
      center: fromLonLat(center),
      zoom: zoom
    })
  })

  map.addOverlay(popup)

  document.getElementById('map').addEventListener('click', (ev) => {
    console.log('Click: ', ev)
  })


  // display popup on click
  // map.on('click', function(evt) {
    // console.log('Map Click')
    // var feature = map.forEachFeatureAtPixel(evt.pixel,
    //   function(feature) {
    //     return feature;
    //   });
    // if (feature) {
    //   var coordinates = feature.getGeometry().getCoordinates();
    //   popup.setPosition(coordinates);
    //   $(popEl).popover({
    //     placement: 'top',
    //     html: true,
    //     content: feature.get('name')
    //   });
    //   $(popEl).popover('show');
    // } else {
    //   $(popEl).popover('destroy');
    // }
  // });
}