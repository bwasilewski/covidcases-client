import React from 'react'
import Card from './Card'
import {
  Table, 
  Title } from 'bloomer'

const CovidCard = props => {
  console.log('Covid Data: ', props.data)
  const { county, state } = props.data.cases

  return (
    <Card title="Covid-19 Data">
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>County</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Confirmed</td>
            <td>{ county.confirmed }</td>
            <td>{ state.confirmed }</td>
          </tr>
          <tr>
            <td>Deaths</td>
            <td>{ county.deaths }</td>
            <td>{ state.deaths }</td>
          </tr>
          <tr>
            <td>Recovered</td>
            <td>{ county.recovered }</td>
            <td>{ state.recovered }</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default CovidCard