import React from 'react'
import Card from './Card'
import {
  Table, 
  Title } from 'bloomer'

const CovidCard = props => {
  console.log('Covid Data: ', props.data)
  const { county, state } = props.data.cases

  return (
    <Card>
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
            <td><small>Confirmed</small></td>
            <td>{ county.confirmed }</td>
            <td>{ state.confirmed }</td>
          </tr>
          <tr>
            <td><small>Deaths</small></td>
            <td>{ county.deaths }</td>
            <td>{ state.deaths }</td>
          </tr>
          <tr>
            <td><small>Recovered</small></td>
            <td>{ county.recovered }</td>
            <td>{ state.recovered }</td>
          </tr>
          <tr>
            <td><small>Affected Counties</small></td>
            <td></td>
            <td>{ state.affectedCounties }</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default CovidCard