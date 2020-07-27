import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BACKEND

export const getLocation = ( country, province = null, admin2 = null ) => {
	return new Promise((resolve, reject) => {
		if ( country === 'United States of America' ) country = 'US'
		let url = `${BASE_URL}/jhu/locations/get/${country}/`
		if ( province ) url += `${province}/`	
		if ( admin2 ) url += `${admin2}/`
		axios.get(url)
			.then(response => resolve(response.data))
			.catch(err => reject(err))
		})
}

