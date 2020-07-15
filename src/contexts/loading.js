import React, { useState } from 'react'

const defaultState = false

export const LoadingContext = React.createContext()

export const LoadingProvider = props => {
  const [loading, setLoading] = useState(defaultState)

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingContext.Provider>
  )
}

