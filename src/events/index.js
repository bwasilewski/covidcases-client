import axios from 'axios'

const BASEURL = process.env.REACT_APP_BACKEND 

export const geoLocateUser = position => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASEURL}/geolocate?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error)) 
  })
}

export const geoLocateByZip = zip => {
  return new Promise(async (resolve, reject) => {
    try {
      const locationData = await axios.get(`${BASEURL}/locatebyzip?zip=${zip}`)
      console.log('Location data: ', locationData)
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
