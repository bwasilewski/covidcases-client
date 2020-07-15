import React from 'react'
import { Table } from 'bloomer'

const GeoCard = props => {
  const { address } = props.data

  return (
    <Table isFullWidth={true}>
      <tbody>
        <tr>
          <td><small>County</small></td>
          <td>{ address.county }</td>            
        </tr>
        <tr>
          <td><small>State</small></td>
          <td>{ address.state }</td>
        </tr>
        <tr>
          <td><small>Postal Code</small></td>
          <td>{ address.postcode }</td>
        </tr>
        <tr>
          <td><small>Country</small></td>
          <td>{ address.country }</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default GeoCard