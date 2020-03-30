import React from 'react'
import { Container, Section } from 'bloomer'

const Page = props => {
  return (
    <Section>
      <Container>
        { props.children }
      </Container>
    </Section>
  )
}

export default Page