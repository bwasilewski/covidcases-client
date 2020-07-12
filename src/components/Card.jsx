import React from 'react'
import { 
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent } from 'bloomer'

const CardComponent = props => {
  return (
    <Card>
      { props.title && (
        <CardHeader>
          <CardHeaderTitle>{ props.title }</CardHeaderTitle>
        </CardHeader>
      )}
      <CardContent>
        { props.children }
      </CardContent>
    </Card>
  )
}

export default CardComponent
