import React from 'react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import { 
  Section,
  Title 
} from 'bloomer'

const About = props => {
  return (
    <Page>
      <p>CovidCases.io was built by <a href="http://benwas.com">Benjamin Wasilewski</a> during the great Coronavirus Lockdown of the year of our L0RD 2020</p>
      <p>It was built with the help of the following resources:</p>

      <ul>
        <li>Maps with <a href="https://openlayers.org/">OpenLayers</a></li>
        <li>Data with the <a href="https://covidnow.docs.apiary.io/">CovidNow API</a></li>
      </ul>

    </Page>
  )
}

export default About