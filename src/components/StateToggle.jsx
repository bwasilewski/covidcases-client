import React from 'react'
import Switch from 'react-switch'
import {
  Level,
  LevelItem,
  LevelLeft,
  LevelRight
} from 'bloomer'

const StateToggle = props => {
  const { onChange, checked } = props
  return (
    <Level>
      <LevelItem>View Stats by State</LevelItem>
      <LevelItem>
        <Switch 
          onChange={onChange} 
          checked={checked} 
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={48} />
      </LevelItem>
    </Level>
  )
}

export default StateToggle