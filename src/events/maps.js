import { fromLonLat } from 'ol/proj'
import Map from 'ol/Map'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
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
    name: 'Null Island'
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

  // const bgLayer = new TileLayer({
  //   source: new XYZ({
  //     url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //   })
  // })

  const rasterLayer = new TileLayer({
    source: new OSM()
  });

 const iconLayer = new VectorLayer({
   source: new VectorSource({
     features: [iconFeature]
   })
 })

//  var statesLayer = new VectorLayer({
//    source: new VectorSource({
//      url: 'public/geojson/us-states.json',
//      format: new GeoJSON()
//    })
//  });
  
  const map = new Map({
    target: 'map',
    layers: [
      rasterLayer,
      // statesLayer,
      iconLayer,
    ],
    view: new View({
      center: fromLonLat(center),
      zoom: zoom
    })
  })

  map.addOverlay(popup)

  map.on('click', function (e) {
    console.log('Event: ', e)
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