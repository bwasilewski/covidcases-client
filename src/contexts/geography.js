import React, { useState } from 'react'

const defaultState = null

export const GeoContext = React.createContext()

export const GeoProvider = props => {
  const [geo, setGeo] = useState(defaultState)

  return (
    <GeoContext.Provider value={[geo, setGeo]}>
      {props.children}
    </GeoContext.Provider>
  )
}

