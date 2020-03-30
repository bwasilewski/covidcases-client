import React from 'react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import OpenMap from '../components/OpenMap'

const Index = props => {
  return (
    <Page>
      <PageHeader title="Welcome!" />
      <OpenMap />
    </Page>
  )
}

export default Index