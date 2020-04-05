import React from 'react'
import Switch from 'react-switch'
import {
  Level,
  LevelItem,
  LevelRight
} from 'bloomer'

const StateToggle = props => {
  const { onChange, checked } = props
  return (
    <Level>
      <LevelRight>
        <LevelItem>View Stats by State</LevelItem>
        <LevelItem>
          <Switch 
            onChange={onChange} 
            checked={checked} 
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            width={48} />
        </LevelItem>
      </LevelRight>
    </Level>
  )
}

export default StateToggle