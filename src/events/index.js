import axios from 'axios'

export const geoLocateUser = position => {
  return new Promise((resolve, reject) => {
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`)
      .then(response => resolve(response.data))
      .catch(error => reject(error)) 
  })
}

export const geoLocateByZip = zipcode => {
  return new Promise(async (resolve, reject) => {
    try {
      const locationData = await axios.get(`https://api.covidnow.com/v1/local/geocoding?address=${zipcode}`)
      console.log('Loc Data: ', locationData)
      const geoData = await geoLocateUser({
        coords: { 
          latitude: locationData.data.lat,
          longitude: locationData.data.lng
        }
      })
      resolve(geoData)
    } catch (error) { reject(error) }
  })
}

export const getCovidByAddress = address => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.covidnow.com/v1/local/finder?address=${address}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getGlobalCovidStats = () => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.covidnow.com/v1/global/stats`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}