import React from 'react'
import { Title } from 'bloomer'

const PageHeader = props => {
  return (
    <>
      <Title isSize="2">{props.title}</Title>
    </>
  )
}

export default PageHeader